// src/zero/queries.ts
import {defineQueries, defineQuery} from '@rocicorp/zero'
import {z} from 'zod'
import {zql} from './schema'
 
export const queries = defineQueries({
  albums: {
    byArtist: defineQuery(
      z.object({artistId: z.string()}),
      ({args: {artistId}}) =>
        zql.albums
          .where('artistId', artistId)
          .orderBy('releaseYear', 'desc')
          .limit(10)
          .related('artist', q => q.one())
    )
  }
})