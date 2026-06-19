import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { authClient, loginWithEmail, loginWithGithub, signUpWithEmail } from "@zero-app/auth";
import { css } from "@zero-app/styled-system/css";

function GithubIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}
import {
  Alert,
  AlertDescription,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Field,
  Label,
  Input,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@zero-app/ui-library";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const session = authClient.useSession();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (session.data?.user) {
    navigate({ to: "/" });
    return null;
  }

  const clearForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setError(null);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await loginWithEmail(email, password);
      if (res?.error) {
        setError(res.error.message ?? "Authentication failed");
      } else {
        navigate({ to: "/" });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await signUpWithEmail(name, email, password);
      if (res?.error) {
        setError(res.error.message ?? "Registration failed");
      } else {
        navigate({ to: "/" });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className={css({
        display: "flex",
        minHeight: "100svh",
        alignItems: "center",
        justifyContent: "center",
        bg: "background",
        p: "4",
      })}
    >
      <Card className={css({ width: "full", maxWidth: "sm" })}>
        <CardHeader>
          <CardTitle className={css({ textAlign: "center", fontSize: "xl" })}>Zero Music</CardTitle>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="signin" onValueChange={clearForm}>
            <TabsList className={css({ width: "full" })}>
              <TabsTrigger value="signin" className={css({ flex: "1" })}>
                Sign in
              </TabsTrigger>
              <TabsTrigger value="signup" className={css({ flex: "1" })}>
                Create account
              </TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <div
                className={css({
                  mt: "4",
                  display: "flex",
                  flexDirection: "column",
                  gap: "3",
                })}
              >
                <Button
                  variant="outline"
                  className={css({ width: "full" })}
                  type="button"
                  onClick={() => loginWithGithub()}
                >
                  <GithubIcon />
                  Continue with GitHub
                </Button>

                <div
                  className={css({
                    display: "flex",
                    alignItems: "center",
                    gap: "2",
                    fontSize: "xs",
                    color: "muted-foreground",
                  })}
                >
                  <div className={css({ height: "1px", flex: "1", bg: "border" })} />
                  <span>or</span>
                  <div className={css({ height: "1px", flex: "1", bg: "border" })} />
                </div>

                <form
                  onSubmit={handleSignIn}
                  className={css({ display: "flex", flexDirection: "column", gap: "3" })}
                >
                  <Field>
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      required
                    />
                  </Field>

                  <Field>
                    <div
                      className={css({
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      })}
                    >
                      <Label htmlFor="signin-password">Password</Label>
                      <Link
                        to="/forgot-password"
                        className={css({
                          fontSize: "xs",
                          color: "muted-foreground",
                          textUnderlineOffset: "4px",
                          _hover: { textDecoration: "underline" },
                        })}
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id="signin-password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      required
                    />
                  </Field>

                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button type="submit" className={css({ width: "full" })} disabled={submitting}>
                    {submitting ? "Signing in…" : "Sign in"}
                  </Button>
                </form>
              </div>
            </TabsContent>

            <TabsContent value="signup">
              <div
                className={css({
                  mt: "4",
                  display: "flex",
                  flexDirection: "column",
                  gap: "3",
                })}
              >
                <Button
                  variant="outline"
                  className={css({ width: "full" })}
                  type="button"
                  onClick={() => loginWithGithub()}
                >
                  <GithubIcon />
                  Continue with GitHub
                </Button>

                <div
                  className={css({
                    display: "flex",
                    alignItems: "center",
                    gap: "2",
                    fontSize: "xs",
                    color: "muted-foreground",
                  })}
                >
                  <div className={css({ height: "1px", flex: "1", bg: "border" })} />
                  <span>or</span>
                  <div className={css({ height: "1px", flex: "1", bg: "border" })} />
                </div>

                <form
                  onSubmit={handleSignUp}
                  className={css({ display: "flex", flexDirection: "column", gap: "3" })}
                >
                  <Field>
                    <Label htmlFor="signup-name">Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                      required
                    />
                  </Field>

                  <Field>
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      required
                    />
                  </Field>

                  <Field>
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="new-password"
                      required
                    />
                  </Field>

                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button type="submit" className={css({ width: "full" })} disabled={submitting}>
                    {submitting ? "Creating account…" : "Create account"}
                  </Button>
                </form>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>

        <CardFooter
          className={css({
            justifyContent: "center",
            borderTopWidth: "1px",
          })}
        >
          <Link
            to="/"
            className={css({
              fontSize: "xs",
              color: "muted-foreground",
              textUnderlineOffset: "4px",
              _hover: { textDecoration: "underline" },
            })}
          >
            ← Back to home
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
