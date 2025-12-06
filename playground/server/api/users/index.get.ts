import { tables, useDrizzle } from '~/server/utils/drizzle'

export default defineEventHandler(async () => {
  const allUsers = await useDrizzle().select().from(tables.users).all()
  return allUsers
})
