import {createFileRoute} from '@tanstack/react-router'
import {handleQueryRequest} from '@rocicorp/zero/server'
import {mustGetQuery} from '@rocicorp/zero'
import {queries, schema} from '@zero-music/zero'
import {auth} from '@zero-music/auth/server'

export const Route = createFileRoute('/api/query')({
  server: {
    handlers: {
      POST: async ({request}) => {
        const session = await auth.api.getSession({headers: request.headers})
        const ctx = session ? {userId: session.user.id} : undefined

        const result = await handleQueryRequest({
          handler: (name, args) => {
            const query = mustGetQuery(queries, name)
            return query.fn({args, ctx})
          },
          schema,
          request,
          userID: session?.user.id ?? null,
        })

        return Response.json(result)
      },
    },
  },
})
