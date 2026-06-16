/**
 * Database seed — populates the schema in `./schema.ts` with deterministic,
 * realistic sample data: artists → albums → fans → favorites.
 *
 * Re-runnable: it truncates the seeded tables (in FK-safe order) before
 * inserting, so running it twice leaves the same data rather than duplicating.
 * Auth tables (user/session/account/verification) are intentionally left
 * untouched — those are owned by better-auth.
 *
 * Run with `deno task db:seed` (see deno.json) or directly:
 *   deno run -A --env-file=.env libs/db/src/lib/seed.ts
 */
import {db} from './db.ts'
import {albums, artists, fans, favorites} from './schema.ts'

const now = new Date()

// Stable ids so favorites can reference albums without juggling returned rows,
// and so re-seeding produces identical primary keys.
const id = (prefix: string, n: number) => `${prefix}_${String(n).padStart(3, '0')}`

interface ArtistSeed {
  name: string
  genre: string
  bio: string
  albums: {title: string; releaseYear: number}[]
}

const ARTISTS: ArtistSeed[] = [
  {
    name: 'Neon Tigers',
    genre: 'Synthwave',
    bio: 'A retro-futurist trio chasing the glow of 1984.',
    albums: [
      {title: 'Midnight Circuit', releaseYear: 2019},
      {title: 'Chrome Hearts', releaseYear: 2021},
      {title: 'Afterglow', releaseYear: 2023},
    ],
  },
  {
    name: 'River Holloway',
    genre: 'Folk',
    bio: 'Songwriter from the Appalachian foothills.',
    albums: [
      {title: 'Paper Boats', releaseYear: 2018},
      {title: 'Stones & Rivers', releaseYear: 2022},
    ],
  },
  {
    name: 'Kaiju Sound System',
    genre: 'Drum & Bass',
    bio: 'Bass-heavy collective born in the warehouse scene.',
    albums: [
      {title: 'Low End Theory', releaseYear: 2020},
      {title: 'Pressure Drop', releaseYear: 2024},
    ],
  },
  {
    name: 'Saoirse Quinn',
    genre: 'Indie Pop',
    bio: 'Dublin-based artist blending shimmer and melancholy.',
    albums: [
      {title: 'Glass Gardens', releaseYear: 2021},
      {title: 'Tiny Revolutions', releaseYear: 2023},
    ],
  },
  {
    name: 'The Brass Verdict',
    genre: 'Jazz',
    bio: 'Seven-piece outfit reviving hard bop for a new decade.',
    albums: [
      {title: 'After Hours', releaseYear: 2017},
      {title: 'Blue Testimony', releaseYear: 2020},
      {title: 'Night Court', releaseYear: 2025},
    ],
  },
]

const FAN_NAMES = [
  'Ava Bennett',
  'Liam Castellanos',
  'Mei Tanaka',
  'Noah Okafor',
  'Sofia Rossi',
  'Elias Wagner',
  'Priya Nair',
  'Daniel Kim',
]

async function seed() {
  console.log('🌱 Seeding database…')

  // Clear in FK-dependency order (children first).
  await db.delete(favorites)
  await db.delete(albums)
  await db.delete(artists)
  await db.delete(fans)

  // Artists + albums.
  const artistRows: (typeof artists.$inferInsert)[] = []
  const albumRows: (typeof albums.$inferInsert)[] = []
  let artistN = 0
  let albumN = 0
  const albumIds: string[] = []

  for (const a of ARTISTS) {
    const artistId = id('artist', ++artistN)
    artistRows.push({id: artistId, name: a.name, genre: a.genre, bio: a.bio, createdAt: now})
    for (const al of a.albums) {
      const albumId = id('album', ++albumN)
      albumIds.push(albumId)
      albumRows.push({
        id: albumId,
        title: al.title,
        artistId,
        releaseYear: al.releaseYear,
        coverArtUrl: `https://picsum.photos/seed/${albumId}/400/400`,
        createdAt: now,
      })
    }
  }

  await db.insert(artists).values(artistRows)
  await db.insert(albums).values(albumRows)

  // Fans.
  const fanRows: (typeof fans.$inferInsert)[] = FAN_NAMES.map((name, i) => ({
    id: id('fan', i + 1),
    name,
    email: `${name.toLowerCase().replace(/[^a-z]+/g, '.')}@example.com`,
    createdAt: now,
  }))
  await db.insert(fans).values(fanRows)

  // Favorites — each fan favorites a deterministic spread of albums.
  const favoriteRows: (typeof favorites.$inferInsert)[] = []
  let favN = 0
  fanRows.forEach((fan, fi) => {
    // 3 albums per fan, picked by a stride so it varies across fans.
    for (let k = 0; k < 3; k++) {
      const albumId = albumIds[(fi * 3 + k * 2 + 1) % albumIds.length]
      favoriteRows.push({
        id: id('favorite', ++favN),
        fanId: fan.id,
        albumId,
        createdAt: now,
      })
    }
  })
  await db.insert(favorites).values(favoriteRows)

  console.log(
    `✅ Seeded ${artistRows.length} artists, ${albumRows.length} albums, ` +
      `${fanRows.length} fans, ${favoriteRows.length} favorites.`,
  )
}

seed()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('❌ Seed failed:', err)
    process.exit(1)
  })
