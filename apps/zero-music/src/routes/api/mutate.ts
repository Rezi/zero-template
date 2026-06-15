import {createFileRoute} from '@tanstack/react-router'
import {handleMutateRequest} from '@rocicorp/zero/server'
import {mustGetMutator} from '@rocicorp/zero'
import {mutators} from '@zero-music/zero'
import {dbProvider} from '@zero-music/zero/server'
import {auth} from '@zero-music/auth/server'

export const Route = createFileRoute('/api/mutate')({
  server: {
    handlers: {
      POST: async ({request}) => {
        const session = await auth.api.getSession({headers: request.headers})
        const ctx = session ? {userId: session.user.id} : undefined

        const result = await handleMutateRequest({
          dbProvider,
          handler: transact =>
            transact((tx, name, args) => {
              if (!ctx) {
                throw new Error('You must be signed in to perform this action')
              }
              const mutator = mustGetMutator(mutators, name)
              return mutator.fn({args, tx, ctx})
            }),
          request,
          userID: session?.user.id ?? null,
        })

        return Response.json(result)
      },
    },
  },
})
