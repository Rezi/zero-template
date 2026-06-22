import { createFileRoute, Link } from "@tanstack/react-router";
import { css } from "@zero-app/styled-system/css";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
  Field,
  Label,
  Input,
} from "@zero-app/ui-library";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  return (
    <div
      className={css({
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        bg: "background",
        p: "4",
      })}
    >
      <Card className={css({ w: "full", maxW: "sm" })}>
        <CardHeader>
          <CardTitle>Reset your password</CardTitle>
          <CardDescription>Enter your email and we'll send you a reset link.</CardDescription>
        </CardHeader>

        <CardContent>
          <form className={css({ display: "flex", flexDir: "column", gap: "3" })}>
            <Field>
              <Label htmlFor="reset-email">Email</Label>
              <Input
                id="reset-email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </Field>
            <Button type="submit" className={css({ w: "full" })}>
              Send reset link
            </Button>
          </form>
        </CardContent>

        <CardFooter className={css({ justifyContent: "center" })}>
          <Link
            to="/login"
            className={css({
              fontSize: "xs",
              color: "muted.foreground",
              textUnderlineOffset: "4px",
              _hover: { textDecoration: "underline" },
            })}
          >
            ← Back to sign in
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
