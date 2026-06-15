import {Outlet, createFileRoute} from '@tanstack/react-router'
import {ZeroInit, SiteLayout} from '@zero-music/zero-app-components'

export const Route = createFileRoute('/_layout')({
  component: RouteComponent,
  staleTime: Infinity,
})

function RouteComponent() {
  return (
    <ZeroInit>
      <SiteLayout>
        <Outlet />
      </SiteLayout>
    </ZeroInit>
  )
}
