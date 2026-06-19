import { Link } from "@tanstack/react-router";
import { authClient, logout } from "@zero-app/auth";
import { useZero } from "@rocicorp/zero/react";
import { Button, buttonVariants } from "@zero-app/ui-library";

export function LoginButton() {
  const session = authClient.useSession();
  const zero = useZero();

  if (session.data?.user) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">{session.data.user.email}</span>
        <Button variant="outline" size="sm" onClick={() => logout(zero)}>
          Sign out
        </Button>
      </div>
    );
  }

  return (
    <Link to="/login" className={buttonVariants({ variant: "link", size: "sm" })}>
      Sign in
    </Link>
  );
}
