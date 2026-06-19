import { createFileRoute, Link } from "@tanstack/react-router";
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
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Reset your password</CardTitle>
          <CardDescription>
            Enter your email and we'll send you a reset link.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="flex flex-col gap-3">
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
            <Button type="submit" className="w-full">
              Send reset link
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-center">
          <Link
            to="/login"
            className="text-xs text-muted-foreground underline-offset-4 hover:underline"
          >
            ← Back to sign in
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
