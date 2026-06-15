import type {Zero} from '@rocicorp/zero'
import {ZeroProvider} from '@rocicorp/zero/react'
import {useRouter} from '@tanstack/react-router'
import {useCallback} from 'react'
import {authClient} from '../auth/client'
import {schema} from '../zero/schema'
import {mutators} from '../zero/mutators'

const cacheURL = import.meta.env.VITE_PUBLIC_ZERO_CACHE_URL
if (!cacheURL) {
  throw new Error('VITE_PUBLIC_ZERO_CACHE_URL is required')
}

const logLevel = import.meta.env.VITE_PUBLIC_ZERO_LOG_LEVEL

export function ZeroInit({children}: {children: React.ReactNode}) {
  const router = useRouter()
  const session = authClient.useSession()

  const context = session.data ? {userId: session.data.user.id} : undefined
  const userID = session.data?.user.id ?? null


  const init = useCallback(
    (zero: Zero) => {
      router.update({
        context: {
          ...router.options.context,
          zero,
        },
      })
      router.invalidate()
    },
    [router],
  )

  return (
    <ZeroProvider
      key={userID ?? 'anon'}
      schema={schema}
      userID={userID}
      context={context}
      cacheURL={cacheURL}
      mutators={mutators}
      init={init}
      logLevel={logLevel}
    >
      {children}
    </ZeroProvider>
  )
}
