import { updateUserSchema } from '~/server/database/schema'
import { eq, tables, useDrizzle } from '~/server/utils/drizzle'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      message: 'User ID is required',
    })
  }

  const body = await readBody(event)

  // Validate input
  const validatedData = updateUserSchema.parse(body)

  // Check if user exists
  const existingUser = await useDrizzle()
    .select()
    .from(tables.users)
    .where(eq(tables.users.id, Number.parseInt(id)))
    .get()

  if (!existingUser) {
    throw createError({
      statusCode: 404,
      message: 'User not found',
    })
  }

  // Update user
  const result = await useDrizzle()
    .update(tables.users)
    .set({
      ...validatedData,
      updatedAt: new Date(),
    })
    .where(eq(tables.users.id, Number.parseInt(id)))
    .returning()
    .get()

  return result
})
