import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useZero } from "@rocicorp/zero/react";
import { useState } from "react";
import { authClient } from "@zero-app/auth";
import { mutators, queries } from "@zero-app/zero";
import { css } from "@zero-app/styled-system/css";
import { PandaCheck as UiLibraryPandaCheck } from "@zero-app/ui-library";
import { PandaCheck as ComponentsPandaCheck } from "@zero-app/zero-app-components";

export const Route = createFileRoute("/_layout/")({
  component: Home,
});

function Home() {
  const zero = useZero();
  const session = authClient.useSession();
  const isSignedIn = !!session.data?.user;
  const [error, setError] = useState<string | null>(null);

  const [albums] = useQuery(queries.albums.byArtist({ artistId: "artist_001" }));

  const onClick = async () => {
    setError(null);
    if (!isSignedIn) {
      setError("Please sign in to add an album.");
      return;
    }
    try {
      const result = zero.mutate(
        mutators.albums.create({
          id: crypto.randomUUID(),
          artistId: "artist_001",
          title: "Please Please Me",
          releaseYear: 1963,
        }),
      );
      await result.server;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Mutation failed");
    }
  };

  return (
    <>
      {/* Panda CSS smoke-test: one style from each package that uses Panda. */}
      <div className={css({ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "2", mb: "6" })}>
        <span
          className={css({
            display: "inline-flex",
            alignItems: "center",
            gap: "2",
            bg: "purple.600",
            color: "white",
            px: "4",
            py: "2",
            rounded: "lg",
            fontWeight: "semibold",
            fontSize: "sm",
          })}
        >
          🐼 Panda CSS works in zero-app
        </span>
        <UiLibraryPandaCheck />
        <ComponentsPandaCheck />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onClick}
          disabled={!isSignedIn}
          title={isSignedIn ? undefined : "Sign in to add an album"}
          className="rounded-md border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1.5 text-sm font-medium hover:bg-[var(--link-bg-hover)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Create Album
        </button>
        {!isSignedIn && (
          <span className="text-sm text-[var(--sea-ink-soft)]">Sign in to add an album.</span>
        )}
      </div>

      {error && (
        <div
          role="alert"
          className="mt-3 rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-600"
        >
          {error}
        </div>
      )}

      <ul className="mt-4">
        {albums.map((album) => (
          <li key={album.id}>{album.title}</li>
        ))}
      </ul>
    </>
  );
}
