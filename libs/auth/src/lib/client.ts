import type { Zero } from "@rocicorp/zero";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  plugins: [],
});

export function loginWithGithub() {
  const callbackURL = location.href;
  authClient.signIn.social({
    provider: "github",
    callbackURL,
    errorCallbackURL: callbackURL,
    newUserCallbackURL: callbackURL,
  });
}

export function loginWithEmail(email: string, password: string) {
  return authClient.signIn.email({ email, password });
}

export function signUpWithEmail(name: string, email: string, password: string) {
  return authClient.signUp.email({ name, email, password });
}

export async function logout(zero: Zero) {
  await zero.delete();
  return authClient.signOut();
}
