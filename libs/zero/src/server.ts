// Server-only entry: imports `pg` and the Zero node-postgres adapter.
// Never import this from client/browser code.
export * from "./lib/db-provider";
