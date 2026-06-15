import {defineConfig} from 'drizzle-kit'

const pgURL = process.env.ZERO_UPSTREAM_DB
if (!pgURL) {
  throw new Error('ZERO_UPSTREAM_DB is not set')
}

export default defineConfig({
  out: './libs/db/src/lib/migrations',
  schema: './libs/db/src/lib/schema.ts',
  dialect: 'postgresql',
  strict: true,
  dbCredentials: {
    url: pgURL,
  },
})
