// Client-safe entry: the better-auth React client only.
// The server `auth` instance (which pulls in the DB connection) lives in
// './server' so it is never bundled into the browser.
export * from "./lib/client";
