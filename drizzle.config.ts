import {defineConfig} from 'drizzle-kit'

const pgURL = process.env.ZERO_UPSTREAM_DB
if (!pgURL) {
  throw new Error('ZERO_UPSTREAM_DB is not set')
}

export default defineConfig({
  out: './src/db/migrations',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  strict: true,
  dbCredentials: {
    url: pgURL,
  },
})
