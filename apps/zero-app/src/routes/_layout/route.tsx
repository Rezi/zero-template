import { Outlet, createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@zero-app/zero-app-components";
import { ZeroInit } from "../../components/ZeroInit";
import { LoginButton } from "../../components/LoginButton";

export const Route = createFileRoute("/_layout")({
  component: RouteComponent,
  staleTime: Infinity,
});

function RouteComponent() {
  return (
    <ZeroInit>
      <SiteLayout rightSlot={<LoginButton />}>
        <Outlet />
      </SiteLayout>
    </ZeroInit>
  );
}
