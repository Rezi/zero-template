import {bigint, index, integer, pgTable, text} from 'drizzle-orm/pg-core'
import {relations} from 'drizzle-orm'

export const artists = pgTable('artists', {
  id: text().primaryKey(),
  name: text().notNull(),
  genre: text().notNull(),
  bio: text(),
  createdAt: bigint('created_at', {mode: 'number'}).notNull(),
})

export const albums = pgTable(
  'albums',
  {
    id: text().primaryKey(),
    title: text().notNull(),
    artistId: text('artist_id')
      .notNull()
      .references(() => artists.id),
    releaseYear: integer('release_year').notNull(),
    coverArtUrl: text('cover_art_url'),
    createdAt: bigint('created_at', {mode: 'number'}).notNull(),
  },
  table => [index('albums_artist_id_idx').on(table.artistId)],
)

export const fans = pgTable('fans', {
  id: text().primaryKey(),
  name: text().notNull(),
  email: text().notNull(),
  createdAt: bigint('created_at', {mode: 'number'}).notNull(),
})

export const favorites = pgTable(
  'favorites',
  {
    id: text().primaryKey(),
    fanId: text('fan_id')
      .notNull()
      .references(() => fans.id),
    albumId: text('album_id')
      .notNull()
      .references(() => albums.id),
    createdAt: bigint('created_at', {mode: 'number'}).notNull(),
  },
  table => [
    index('favorites_fan_id_idx').on(table.fanId),
    index('favorites_album_id_idx').on(table.albumId),
  ],
)

export const artistsRelations = relations(artists, ({many}) => ({
  albums: many(albums),
}))

export const albumsRelations = relations(albums, ({one, many}) => ({
  artist: one(artists, {
    fields: [albums.artistId],
    references: [artists.id],
  }),
  favorites: many(favorites),
}))

export const fansRelations = relations(fans, ({many}) => ({
  favorites: many(favorites),
}))

export const favoritesRelations = relations(favorites, ({one}) => ({
  fan: one(fans, {
    fields: [favorites.fanId],
    references: [fans.id],
  }),
  album: one(albums, {
    fields: [favorites.albumId],
    references: [albums.id],
  }),
}))
