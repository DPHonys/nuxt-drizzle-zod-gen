import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'

import * as schema from '#shared/database/schema'
export { sql, eq, and, or } from 'drizzle-orm'

export const tables = schema

let _db: ReturnType<typeof drizzle> | null = null

export function useDrizzle() {
  if (!_db) {
    const client = createClient({
      url: 'file:./playground/sqlite.db',
    })
    _db = drizzle(client, { schema })
  }
  return _db
}
