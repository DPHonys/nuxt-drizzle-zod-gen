import type * as z4 from 'zod/v4/core'

export function hasZodType(schema: unknown, type: string): boolean {
  return (
    typeof schema === 'object' &&
    schema !== null &&
    '_zod' in schema &&
    typeof schema._zod === 'object' &&
    schema._zod !== null &&
    'def' in schema._zod &&
    typeof schema._zod.def === 'object' &&
    schema._zod.def !== null &&
    'type' in schema._zod.def &&
    schema._zod.def.type === type
  )
}

export function hasFormat(
  schema: z4.$ZodStringFormat,
  format: string
): boolean {
  const def = schema._zod.def
  return def.format === format
}
