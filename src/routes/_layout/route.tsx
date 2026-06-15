import {Outlet, createFileRoute} from '@tanstack/react-router'
import {ZeroInit} from '../../components/ZeroInit'
import {SiteLayout} from '../../components/SiteLayout'

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
