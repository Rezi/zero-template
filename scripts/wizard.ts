/**
 * Dev dashboard wizard — run with `deno task wiz`.
 *
 * An interactive control panel (built on @clack/prompts) for the common dev
 * flows in this workspace: start the dev server, the Zero cache backend, run a
 * target on any app/library, builds, tests, lint, e2e, Docker (Postgres) and
 * Drizzle migrations. Jobs run as background child processes so several can run
 * at once (e.g. dev server + zero-cache + a build); their output is captured to
 * `.wiz/logs/` and viewable from the "Jobs" menu. Quitting stops running jobs.
 */
import * as p from "@clack/prompts";

const ROOT = new URL("..", import.meta.url).pathname;
const LOG_DIR = `${ROOT}.wiz/logs`;

const encoder = new TextEncoder();
const decoder = new TextDecoder();

type JobStatus = "running" | "done" | "failed" | "stopped";

interface Job {
  id: number;
  label: string;
  key: string; // identity for duplicate detection (e.g. "dev")
  display: string; // human "deno task dev"
  child: Deno.ChildProcess;
  status: JobStatus;
  code?: number;
  logFile: string;
  startedAt: number;
}

const jobs: Job[] = [];
let counter = 0;

const sym = { running: "●", done: "✓", failed: "✗", stopped: "■" } as const;
// Status colors: running=green, errored/failed=red, stopped=yellow, done=dim.
const statusColor: Record<JobStatus, string> = {
  running: "\x1b[32m",
  done: "\x1b[2m",
  stopped: "\x1b[33m",
  failed: "\x1b[31m",
};

function fmtElapsed(ms: number): string {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  return `${String(m).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

/** Serialized writer so stdout+stderr chunks don't interleave-corrupt the log. */
function makeWriter(file: Deno.FsFile) {
  let chain: Promise<unknown> = Promise.resolve();
  return (chunk: Uint8Array) => {
    chain = chain.then(() => file.write(chunk));
    return chain;
  };
}

async function pump(stream: ReadableStream<Uint8Array>, write: (c: Uint8Array) => unknown) {
  const reader = stream.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) await write(value);
    }
  } catch {
    // stream closed on kill — ignore
  }
}

async function startJob(opts: {
  label: string;
  key?: string;
  command: string;
  args: string[];
}): Promise<void> {
  // Warn before launching a duplicate long-running job (two dev servers, etc.).
  const dup = jobs.find((j) => j.status === "running" && j.key === (opts.key ?? opts.label));
  if (dup) {
    const go = await p.confirm({
      message: `"${dup.label}" is already running. Start another anyway?`,
      initialValue: false,
    });
    if (p.isCancel(go) || !go) return;
  }

  await Deno.mkdir(LOG_DIR, { recursive: true });
  const id = ++counter;
  const logFile = `${LOG_DIR}/${id}-${(opts.key ?? opts.label).replace(/[^a-z0-9]+/gi, "-")}.log`;
  const file = await Deno.open(logFile, { create: true, write: true, truncate: true });

  let child: Deno.ChildProcess;
  try {
    child = new Deno.Command(opts.command, {
      args: opts.args,
      cwd: ROOT,
      stdout: "piped",
      stderr: "piped",
    }).spawn();
  } catch (err) {
    file.close();
    p.log.error(`Failed to start ${opts.label}: ${err instanceof Error ? err.message : err}`);
    return;
  }

  const display = `${opts.command} ${opts.args.join(" ")}`;
  const write = makeWriter(file);
  const enc = new TextEncoder();
  write(enc.encode(`$ ${display}\n`));

  const job: Job = {
    id,
    label: opts.label,
    key: opts.key ?? opts.label,
    display,
    child,
    status: "running",
    logFile,
    startedAt: Date.now(),
  };
  jobs.push(job);

  // Drain both streams into the log file.
  Promise.all([pump(child.stdout, write), pump(child.stderr, write)]).catch(() => {});

  // Track completion without blocking the menu.
  child.status.then((s) => {
    if (job.status === "running") {
      job.status = s.success ? "done" : "failed";
      job.code = s.code;
    }
    file.close();
  }).catch(() => file.close());

  p.log.success(`Started [${id}] ${opts.label} → ${display}`);
}

function formatJobRow(j: Job): string {
  const meta = j.status === "running"
    ? fmtElapsed(Date.now() - j.startedAt)
    : `${j.status}${j.code != null ? ` (${j.code})` : ""}`;
  return `${sym[j.status]} [${j.id}] ${j.label}  ·  ${meta}`;
}

function runningJobs(): Job[] {
  return jobs.filter((j) => j.status === "running");
}

function stopJob(job: Job) {
  if (job.status !== "running") return;
  try {
    job.child.kill("SIGTERM");
  } catch {
    // already gone
  }
  job.status = "stopped";
}

async function followJob(job: Job) {
  console.log(`\n\x1b[2m--- following [${job.id}] ${job.label} — q / Esc / Ctrl+C to stop ---\x1b[0m\n`);
  let pos = 0;
  // Stream appended log bytes on a timer. Raw-mode stdin read (not SIGINT) lets
  // us stop cleanly and return to the menu instead of killing the wizard.
  const flush = () => {
    let data: Uint8Array;
    try {
      data = Deno.readFileSync(job.logFile);
    } catch {
      return;
    }
    if (data.length > pos) {
      Deno.stdout.writeSync(data.subarray(pos));
      pos = data.length;
    }
  };
  flush();
  const timer = setInterval(flush, 300);
  Deno.stdin.setRaw(true);
  const buf = new Uint8Array(16);
  try {
    while (true) {
      const n = await Deno.stdin.read(buf);
      if (n === null) break;
      const s = decoder.decode(buf.subarray(0, n));
      if (s === "\x03" || s === "q" || s === "\x1b") break; // Ctrl+C / q / Esc
    }
  } finally {
    clearInterval(timer);
    Deno.stdin.setRaw(false);
    console.log("\n\x1b[2m--- stopped following ---\x1b[0m\n");
  }
}

// ── Workspace metadata ──────────────────────────────────────────────────────
interface Project {
  name: string;
  type: "app" | "lib";
  targets: string[];
}

/** Discover projects + their targets from apps/* and libs/* project.json files. */
function loadProjects(): Project[] {
  const found: Project[] = [];
  for (const base of ["apps", "libs"] as const) {
    let entries: Deno.DirEntry[];
    try {
      entries = [...Deno.readDirSync(`${ROOT}${base}`)];
    } catch {
      continue; // folder doesn't exist
    }
    for (const entry of entries) {
      if (!entry.isDirectory) continue;
      let json: { name?: string; projectType?: string; targets?: Record<string, unknown> };
      try {
        json = JSON.parse(Deno.readTextFileSync(`${ROOT}${base}/${entry.name}/project.json`));
      } catch {
        continue; // no/invalid project.json — skip
      }
      const targets = Object.keys(json.targets ?? {});
      if (targets.length === 0) continue;
      found.push({
        name: json.name ?? entry.name,
        type: json.projectType === "application" ? "app" : "lib",
        targets,
      });
    }
  }
  // apps first, then libs; alphabetical within each group.
  found.sort((a, b) =>
    a.type === b.type ? a.name.localeCompare(b.name) : a.type === "app" ? -1 : 1
  );
  return found;
}

const PROJECTS: Project[] = loadProjects();

const denoTask = (task: string, extra: string[] = []) => ({
  command: "deno",
  args: ["task", task, ...extra],
});
const nxTarget = (target: string, project: string) => ({
  command: "deno",
  args: ["task", "nx", target, project],
});

async function pickProjectTarget() {
  if (PROJECTS.length === 0) {
    p.log.warn("No projects with targets found under apps/ or libs/.");
    return;
  }
  const project = await p.select({
    message: "Which app/library?",
    options: PROJECTS.map((pr) => ({
      value: pr.name,
      label: pr.name,
      hint: `${pr.type} · ${pr.targets.join(", ")}`,
    })),
  });
  if (p.isCancel(project)) return;
  const proj = PROJECTS.find((pr) => pr.name === project)!;
  const target = await p.select({
    message: `Target for ${project}`,
    options: proj.targets.map((t) => ({ value: t, label: t })),
  });
  if (p.isCancel(target)) return;
  await startJob({
    label: `${target}:${project}`,
    key: `${target}:${project}`,
    ...nxTarget(target as string, project as string),
  });
}

async function runMany(target: string, candidates: string[]) {
  if (candidates.length === 0) {
    p.log.warn(`No projects expose a "${target}" target.`);
    return;
  }
  const choice = await p.multiselect({
    message: `Run "${target}" on which projects? (none selected = all)`,
    options: candidates.map((c) => ({ value: c, label: c })),
    required: false,
  });
  if (p.isCancel(choice)) return;
  const projects = choice as string[];
  if (projects.length === 0) {
    await startJob({
      label: `${target}:all`,
      key: `${target}:all`,
      ...denoTask("nx", ["run-many", `--target=${target}`]),
    });
  } else {
    await startJob({
      label: `${target}:${projects.join(",")}`,
      key: `${target}:${projects.join(",")}`,
      ...denoTask("nx", ["run-many", `--target=${target}`, `--projects=${projects.join(",")}`]),
    });
  }
}

async function dockerMenu() {
  const action = await p.select({
    message: "Docker (Postgres)",
    options: [
      { value: "up-d", label: "Start (detached)", hint: "docker compose up -d" },
      { value: "up", label: "Start + follow logs", hint: "docker compose up" },
      { value: "logs", label: "Follow logs", hint: "docker compose logs -f" },
      { value: "ps", label: "Status", hint: "docker compose ps" },
      { value: "restart", label: "Restart", hint: "docker compose restart" },
      { value: "down", label: "Stop", hint: "docker compose down" },
      { value: "back", label: "← Back" },
    ],
  });
  if (p.isCancel(action) || action === "back") return;
  const map: Record<string, { label: string; args: string[] }> = {
    "up-d": { label: "docker up -d", args: ["compose", "up", "-d"] },
    "up": { label: "docker up", args: ["compose", "up"] },
    "logs": { label: "docker logs", args: ["compose", "logs", "-f"] },
    "ps": { label: "docker ps", args: ["compose", "ps"] },
    "restart": { label: "docker restart", args: ["compose", "restart"] },
    "down": { label: "docker down", args: ["compose", "down"] },
  };
  const cmd = map[action as string];
  await startJob({ label: cmd.label, key: cmd.label, command: "docker", args: cmd.args });
}

async function dbMenu() {
  const action = await p.select({
    message: "Database (Drizzle)",
    options: [
      { value: "db:migrate", label: "Migrate", hint: "apply migrations" },
      { value: "db:generate", label: "Generate migration", hint: "from schema changes" },
      { value: "db:push", label: "Push schema", hint: "dev only" },
      { value: "db:seed", label: "Seed", hint: "populate with sample data" },
      { value: "generate-zero-schema", label: "Generate Zero schema", hint: "from Drizzle" },
      { value: "back", label: "← Back" },
    ],
  });
  if (p.isCancel(action) || action === "back") return;
  await startJob({ label: action as string, key: action as string, ...denoTask(action as string) });
}

interface MenuOption {
  value: string;
  label: string;
  hint?: string;
}

type MenuResult =
  | { kind: "action"; value: string }
  | { kind: "job"; id: number }
  | { kind: "clear"; id: number }
  | { kind: "cancel" };

const LOG_HEIGHT = 15; // lines of log shown when hovering a job in the menu

/**
 * Recognize a key read that is one navigation key, possibly repeated (a held
 * key or fast input can deliver several sequences in a single stdin read).
 * Returns the direction and how many times it was pressed, or null.
 */
function navKey(s: string): { dir: "up" | "down" | "left" | "right"; count: number } | null {
  const map: Record<string, "up" | "down" | "left" | "right"> = {
    "\x1b[A": "up",
    k: "up",
    "\x1b[B": "down",
    j: "down",
    "\x1b[D": "left",
    h: "left",
    "\x1b[C": "right",
    l: "right",
  };
  for (const [seq, dir] of Object.entries(map)) {
    if (s.length && s.length % seq.length === 0 && s.split(seq).every((x) => x === "")) {
      return { dir, count: s.length / seq.length };
    }
  }
  return null;
}

/** All log lines of a job, ANSI/CR stripped for stable layout. */
function readLogLines(job: Job): string[] {
  let text: string;
  try {
    text = Deno.readTextFileSync(job.logFile);
  } catch {
    return [];
  }
  const clean = text.replace(/\x1b\[[0-9;?]*[A-Za-z]/g, "").replace(/\r/g, "");
  let lines = clean.split("\n");
  if (lines.length && lines[lines.length - 1] === "") lines = lines.slice(0, -1);
  return lines;
}

/**
 * Custom main menu that live-refreshes every second, in place. The jobs panel
 * and the action list form ONE cursor list: navigating up into a job replaces
 * the action menu with that job's live log tail (so you observe it without
 * leaving the menu); moving back down restores the menu. clack's `select` has
 * no background tick, so we render with ANSI — each frame moves the cursor to
 * the top of the previous frame and clears downward, so nothing scrolls.
 * ↑/↓ (or j/k) navigate; while on a job, ←/→ (or h/l) scroll its log (left =
 * older, right = newer; back to the bottom resumes live tail). Enter acts
 * (run action / follow job); on a job, s stops a running one and c clears a
 * finished one. q / Esc / Ctrl+C cancel.
 */
async function liveMenu(message: string, options: MenuOption[]): Promise<MenuResult> {
  const jobList = jobs; // length is stable for this invocation (jobs are only added between menus)
  const total = jobList.length + options.length;
  let index = jobList.length; // start on the first action, not a job
  let frameLines = 0;
  // Log scroll, in lines from the bottom (0 = live tail). Reset when the
  // selected item changes. While scrolled up, we keep the view anchored to the
  // same lines as new output arrives; scroll back to 0 to resume following.
  let logScroll = 0;
  let lastTotal = -1;

  const cols = () => {
    try {
      return Deno.consoleSize().columns;
    } catch {
      return 80;
    }
  };

  const build = (): string[] => {
    const width = cols();
    const onJob = index < jobList.length;
    const lines: string[] = [];

    lines.push(`\x1b[36m┌─ Jobs (${runningJobs().length} running) ─────────────────────\x1b[0m`);
    if (jobList.length === 0) {
      lines.push(`\x1b[36m│\x1b[0m \x1b[2mNo jobs yet — pick an action below.\x1b[0m`);
    } else {
      jobList.forEach((j, i) => {
        const sel = index === i;
        const ptr = sel ? "\x1b[36m❯\x1b[0m" : " ";
        const row = `${sel ? "\x1b[1m" : ""}${statusColor[j.status]}${formatJobRow(j)}\x1b[0m`;
        lines.push(`\x1b[36m│\x1b[0m ${ptr} ${row}`);
      });
    }
    lines.push(`\x1b[36m└──────────────────────────────────────────\x1b[0m`);
    lines.push("");

    if (onJob) {
      const job = jobList[index];
      const all = readLogLines(job);
      const lineCount = all.length;
      // Anchor the view while scrolled up and new lines arrive.
      if (logScroll > 0 && lastTotal >= 0 && lineCount > lastTotal) logScroll += lineCount - lastTotal;
      lastTotal = lineCount;
      const maxScroll = Math.max(0, lineCount - LOG_HEIGHT);
      logScroll = Math.min(Math.max(logScroll, 0), maxScroll);
      const end = lineCount - logScroll;
      const start = Math.max(0, end - LOG_HEIGHT);
      const view = all.slice(start, end);
      const clip = (s: string) => (s.length > width - 2 ? s.slice(0, width - 3) + "…" : s);

      const pos = lineCount === 0
        ? "\x1b[2m(no output yet)\x1b[0m"
        : logScroll === 0
        ? `\x1b[2m[${end}/${lineCount} · live]\x1b[0m`
        : `\x1b[33m[${start + 1}-${end}/${lineCount} ↑${logScroll}]\x1b[0m`;
      const jobAction = job.status === "running" ? " · s stop" : " · c clear";
      lines.push(
        `\x1b[1mLog — [${job.id}] ${job.label}\x1b[0m  \x1b[2m(↑/↓ move · ←/→ scroll · enter follow${jobAction} · q quit)\x1b[0m  ${pos}`,
      );
      const body = view.length ? view : ["(no output yet)"];
      for (const l of body) lines.push(`\x1b[2m│\x1b[0m ${clip(l)}`);
      for (let k = body.length; k < LOG_HEIGHT; k++) lines.push(`\x1b[2m│\x1b[0m`); // pad to stable height
    } else {
      lines.push(`\x1b[1m${message}\x1b[0m  \x1b[2m(↑/↓ move · enter select · q quit)\x1b[0m`);
      options.forEach((o, k) => {
        const sel = index === jobList.length + k;
        const ptr = sel ? "\x1b[36m❯\x1b[0m" : " ";
        const lbl = sel ? `\x1b[36m${o.label}\x1b[0m` : o.label;
        const hint = o.hint ? `  \x1b[2m${o.hint}\x1b[0m` : "";
        lines.push(`${ptr} ${lbl}${hint}`);
      });
    }
    return lines;
  };

  const render = () => {
    const lines = build();
    let out = frameLines > 0 ? `\x1b[${frameLines}A` : "";
    out += `\r\x1b[0J${lines.join("\n")}`;
    Deno.stdout.writeSync(encoder.encode(out));
    frameLines = lines.length - 1;
  };

  render();
  const timer = setInterval(render, 1000);
  Deno.stdin.setRaw(true);
  Deno.stdout.writeSync(encoder.encode("\x1b[?25l")); // hide cursor
  const buf = new Uint8Array(16);
  try {
    while (true) {
      const n = await Deno.stdin.read(buf);
      if (n === null) return { kind: "cancel" };
      const s = decoder.decode(buf.subarray(0, n));
      if (s === "\x03" || s === "q" || s === "\x1b") return { kind: "cancel" }; // Ctrl+C / q / Esc
      if (s === "\r" || s === "\n") {
        return index < jobList.length
          ? { kind: "job", id: jobList[index].id }
          : { kind: "action", value: options[index - jobList.length].value };
      }
      if (s === "s" && index < jobList.length) {
        const job = jobList[index];
        if (job.status === "running") {
          stopJob(job);
          render();
        }
        continue;
      }
      if (s === "c" && index < jobList.length) {
        const job = jobList[index];
        if (job.status !== "running") return { kind: "clear", id: job.id };
        continue;
      }
      const nav = navKey(s);
      if (!nav) continue;
      if (nav.dir === "up" || nav.dir === "down") {
        const delta = nav.dir === "up" ? -nav.count : nav.count;
        index = (((index + delta) % total) + total) % total;
        logScroll = 0; // new selection → start at live tail
        lastTotal = -1;
        render();
      } else if (index < jobList.length) {
        // left → older, right → newer (one page per press; render clamps)
        const step = (LOG_HEIGHT - 2) * nav.count;
        logScroll = Math.max(0, logScroll + (nav.dir === "left" ? step : -step));
        render();
      }
    }
  } finally {
    clearInterval(timer);
    Deno.stdin.setRaw(false);
    Deno.stdout.writeSync(encoder.encode("\x1b[?25h\n")); // show cursor + drop below frame
  }
}

async function main() {
  if (!Deno.stdin.isTerminal()) {
    console.error("`deno task wiz` must be run in an interactive terminal.");
    Deno.exit(1);
  }
  console.clear();
  p.intro("🎛  zero-music dev dashboard");

  while (true) {
    const result = await liveMenu("What do you want to run?", [
      { value: "dev", label: "💻  Dev server", hint: "deno task dev (zero-app)" },
      { value: "zero-cache", label: "🌍  Zero cache (backend)", hint: "deno task zero-cache" },
      { value: "run-target", label: "🏃  Run a target on an app/library…" },
      { value: "build", label: "🔨 Build…" },
      { value: "test", label: "🧪 Test…" },
      { value: "lint", label: "✓  Lint…" },
      { value: "e2e", label: "🎭 E2E tests", hint: "deno task e2e" },
      { value: "docker", label: "🐳 Docker…" },
      { value: "db", label: "🗄  Database…" },
      { value: "native", label: "🔧 Rebuild native deps", hint: "deno task deno" },
      { value: "clear", label: "🧹 Clear finished jobs", hint: "remove done/failed/stopped" },
      { value: "quit", label: "⏻  Exit" },
    ]);

    if (result.kind === "cancel") break;
    if (result.kind === "job") {
      const job = jobs.find((j) => j.id === result.id);
      if (job) await followJob(job);
      continue;
    }
    if (result.kind === "clear") {
      const idx = jobs.findIndex((j) => j.id === result.id);
      if (idx >= 0) {
        try {
          Deno.removeSync(jobs[idx].logFile);
        } catch {
          // log already gone — ignore
        }
        jobs.splice(idx, 1);
      }
      continue;
    }

    const action = result.value;
    if (action === "quit") break;

    switch (action) {
      case "dev":
        await startJob({ label: "dev", key: "dev", ...denoTask("dev") });
        break;
      case "zero-cache":
        await startJob({ label: "zero-cache", key: "zero-cache", ...denoTask("zero-cache") });
        break;
      case "run-target":
        await pickProjectTarget();
        break;
      case "build":
        await runMany("build", PROJECTS.filter((p) => p.targets.includes("build")).map((p) => p.name));
        break;
      case "test":
        await runMany("test", PROJECTS.filter((p) => p.targets.includes("test")).map((p) => p.name));
        break;
      case "lint":
        await runMany("lint", PROJECTS.filter((p) => p.targets.includes("lint")).map((p) => p.name));
        break;
      case "e2e":
        await startJob({ label: "e2e", key: "e2e", ...denoTask("e2e") });
        break;
      case "docker":
        await dockerMenu();
        break;
      case "db":
        await dbMenu();
        break;
      case "native":
        await startJob({ label: "native rebuild", key: "native", ...denoTask("deno") });
        break;
      case "clear": {
        const finished = jobs.filter((j) => j.status !== "running");
        for (const j of finished) {
          try {
            Deno.removeSync(j.logFile);
          } catch {
            // log already gone — ignore
          }
        }
        const keep = jobs.filter((j) => j.status === "running");
        jobs.length = 0;
        jobs.push(...keep);
        p.log.success(`Cleared ${finished.length} finished job(s).`);
        break;
      }
    }
  }

  const running = runningJobs();
  if (running.length > 0) {
    const stop = await p.confirm({
      message: `${running.length} job(s) still running. Stop them before exiting?`,
      initialValue: true,
    });
    // Children die with this process regardless; stop cleanly either way.
    running.forEach(stopJob);
    if (!p.isCancel(stop)) {
      p.log.info(`Stopped ${running.length} job(s).`);
    }
  }
  p.outro("Bye 👋");
  Deno.exit(0);
}

main();
