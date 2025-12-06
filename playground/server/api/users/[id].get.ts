import { eq, tables, useDrizzle } from '~/server/utils/drizzle'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      message: 'User ID is required',
    })
  }

  const user = await useDrizzle()
    .select()
    .from(tables.users)
    .where(eq(tables.users.id, Number.parseInt(id)))
    .get()

  if (!user) {
    throw createError({
      statusCode: 404,
      message: 'User not found',
    })
  }

  return user
})
