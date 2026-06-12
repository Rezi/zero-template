// src/routes/__root.tsx
import {ZeroProvider} from '@rocicorp/zero/react'
import type {ZeroOptions} from '@rocicorp/zero'
import {
  HeadContent,
  Scripts,
  createRootRoute
} from '@tanstack/react-router'
import type {ReactNode} from 'react'
import {schema} from '../zero/schema'
import {mutators} from '../zero/mutators'
 
const opts: ZeroOptions = {
  cacheURL: 'http://localhost:4848',
  schema,
  mutators
}
 
export const Route = createRootRoute({
  shellComponent: RootDocument
})
 
function RootDocument({children}: {children: ReactNode}) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <ZeroProvider {...opts}>{children}</ZeroProvider>
        <Scripts />
      </body>
    </html>
  )
}