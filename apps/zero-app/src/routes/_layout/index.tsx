import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useZero } from "@rocicorp/zero/react";
import { useState } from "react";
import { authClient } from "@zero-app/auth";
import { mutators, queries } from "@zero-app/zero";
import { css } from "@zero-app/styled-system/css";

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
      <div className={css({ display: "flex", alignItems: "center", gap: "3" })}>
        <button
          type="button"
          onClick={onClick}
          disabled={!isSignedIn}
          title={isSignedIn ? undefined : "Sign in to add an album"}
          className={css({
            rounded: "md",
            borderWidth: "1px",
            borderColor: "var(--chip-line)",
            bg: "var(--chip-bg)",
            px: "3",
            py: "1.5",
            fontSize: "sm",
            fontWeight: "medium",
            _hover: { bg: "var(--link-bg-hover)" },
            _disabled: { cursor: "not-allowed", opacity: "0.5" },
          })}
        >
          Create Album
        </button>
        {!isSignedIn && (
          <span className={css({ fontSize: "sm", color: "var(--sea-ink-soft)" })}>
            Sign in to add an album.
          </span>
        )}
      </div>

      {error && (
        <div
          role="alert"
          className={css({
            mt: "3",
            rounded: "md",
            borderWidth: "1px",
            borderColor: "red.500/40",
            bg: "red.500/10",
            px: "3",
            py: "2",
            fontSize: "sm",
            color: "red.600",
          })}
        >
          {error}
        </div>
      )}

      <ul className={css({ mt: "4" })}>
        {albums.map((album) => (
          <li key={album.id}>{album.title}</li>
        ))}
      </ul>
    </>
  );
}
