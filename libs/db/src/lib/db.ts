import { drizzle } from "drizzle-orm/node-postgres";

const pgURL = process.env.ZERO_UPSTREAM_DB;
if (!pgURL) {
  throw new Error("ZERO_UPSTREAM_DB is not set");
}

export const db = drizzle(pgURL);
