import { Link } from "@tanstack/react-router";
import { authClient, logout } from "@zero-app/auth";
import { useZero } from "@rocicorp/zero/react";
import { Button, buttonVariants } from "@zero-app/ui-library";
import { css } from "@zero-app/styled-system/css";

export function LoginButton() {
  const session = authClient.useSession();
  const zero = useZero();

  if (session.data?.user) {
    return (
      <div className={css({ display: "flex", alignItems: "center", gap: "2", fontSize: "sm" })}>
        <span className={css({ color: "muted.foreground" })}>{session.data.user.email}</span>
        <Button variant="outline" size="sm" onClick={() => logout(zero)}>
          Sign out
        </Button>
      </div>
    );
  }

  return (
    <>
      <Link to="/login" className={buttonVariants({ variant: "link", size: "lg" })}>
        Sign in d
      </Link>
    </>
  );
}
