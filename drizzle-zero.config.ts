import {drizzleZeroConfig} from 'drizzle-zero'
import * as drizzleSchema from './src/db/schema'

export default drizzleZeroConfig(drizzleSchema, {
  tables: {
    artists: {
      id: true,
      name: true,
      genre: true,
      bio: true,
      createdAt: true,
    },
    albums: {
      id: true,
      title: true,
      artistId: true,
      releaseYear: true,
      coverArtUrl: true,
      createdAt: true,
    },
    fans: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
    favorites: {
      id: true,
      fanId: true,
      albumId: true,
      createdAt: true,
    },
  },
})
