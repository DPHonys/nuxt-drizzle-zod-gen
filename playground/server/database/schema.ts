import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'
import { createSchemaFactory } from 'drizzle-zod'
import { z } from 'zod'

const { createInsertSchema, createSelectSchema, createUpdateSchema } =
  createSchemaFactory({ zodInstance: z })

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
  test: text('test').default('default_value'),
})

export const insertUserSchema = createInsertSchema(users, {
  name: (schema) => schema.min(1, 'Name is required').max(100, 'Name too long'),
  email: z.email('Invalid email address'),
  test: z.string(),
})

export const updateUserSchema = createUpdateSchema(users, {
  name: (schema) => schema.min(1, 'Name is required').max(100, 'Name too long'),
  email: z.email('Invalid email address'),
})

export const selectUserSchema = createSelectSchema(users)

export type InsertUser = z.infer<typeof insertUserSchema>
export type UpdateUser = z.infer<typeof updateUserSchema>
export type User = z.infer<typeof selectUserSchema>
