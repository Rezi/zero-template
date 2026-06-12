// src/routes/api/query.ts
import {createFileRoute} from '@tanstack/react-router'
import {handleQueryRequest} from '@rocicorp/zero/server'
import {mustGetQuery} from '@rocicorp/zero'
import {queries} from '../../zero/queries'
import {schema} from '../../zero/schema'
 
export const Route = createFileRoute('/api/query')({
  server: {
    handlers: {
      POST: async ({request}) => {
        const result = await handleQueryRequest({
          handler: (name, args) => {
            const query = mustGetQuery(queries, name)
            return query.fn({args})
          },
          schema,
          request,
          userID: null
        })
 
        return Response.json(result)
      }
    }
  }
})