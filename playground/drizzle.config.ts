import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './shared/database/schema.ts',
  out: './server/database/migrations',
  dialect: 'sqlite',
  dbCredentials: {
    url: 'file:sqlite.db',
  },
})
