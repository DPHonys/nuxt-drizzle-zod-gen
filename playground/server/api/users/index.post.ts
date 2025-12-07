import { insertUserSchema } from '~/server/database/schema'
import { tables, useDrizzle } from '~/server/utils/drizzle'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Validate input
  const validatedData = insertUserSchema.parse(body)

  // Insert user
  const result = await useDrizzle()
    .insert(tables.users)
    .values({
      ...validatedData,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning()
    .get()

  return result
})
