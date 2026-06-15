import {createRouter as createTanStackRouter} from '@tanstack/react-router'
import type {Zero} from '@rocicorp/zero'
import {routeTree} from './routeTree.gen'

export interface RouterContext {
  zero?: Zero
}

export function getRouter() {
  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    defaultPreloadGcTime: 0,
    context: {} satisfies RouterContext,
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
