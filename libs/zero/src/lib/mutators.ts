// src/zero/mutators.ts
import { defineMutators, defineMutator } from "@rocicorp/zero";
import { z } from "zod";

export const mutators = defineMutators({
  albums: {
    create: defineMutator(
      z.object({
        id: z.string(),
        artistId: z.string(),
        title: z.string(),
        releaseYear: z.number(),
      }),
      async ({ args, tx }) => {
        await tx.mutate.albums.insert({
          ...args,
          createdAt: Date.now(),
        });
      },
    ),
  },
});
