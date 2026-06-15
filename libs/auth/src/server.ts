// Server-only entry: the better-auth instance wired to the Drizzle/Postgres DB.
// Never import this from client/browser code.
export * from './lib/auth'
