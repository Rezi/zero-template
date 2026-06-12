// src/routes/api/mutate.ts
import {createFileRoute} from '@tanstack/react-router'
import {handleMutateRequest} from '@rocicorp/zero/server'
import {mustGetMutator} from '@rocicorp/zero'
import {mutators} from '../../zero/mutators'
import {dbProvider} from '../../zero/db-provider'
 
export const Route = createFileRoute('/api/mutate')({
  server: {
    handlers: {
      POST: async ({request}) => {
        const result = await handleMutateRequest({
          dbProvider,
          handler: transact =>
            transact((tx, name, args) => {
              const mutator = mustGetMutator(mutators, name)
              return mutator.fn({args, tx})
            }),
          request,
          userID: null
        })
 
        return Response.json(result)
      }
    }
  }
})