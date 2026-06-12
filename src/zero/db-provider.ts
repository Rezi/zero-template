// src/zero/db-provider.ts
import {zeroNodePg} from '@rocicorp/zero/server/adapters/pg'
import {Pool} from 'pg'
import {schema} from './schema'
 
const connectionString = process.env.ZERO_UPSTREAM_DB
if (!connectionString) {
  throw new Error('ZERO_UPSTREAM_DB is not set')
}
 
const pool = new Pool({
  connectionString
})
export const dbProvider = zeroNodePg(schema, pool)
 
// Register global types for mutators on the server
declare module '@rocicorp/zero' {
  interface DefaultTypes {
    dbProvider: typeof dbProvider
  }
}