import type * as z4 from 'zod/v4/core'

export function createGenerator<
  TInput extends z4.$ZodType,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TOutput extends TInput = any,
>(
  guard: (schema: TInput) => schema is TOutput,
  generator: (field: TOutput, indent: number) => string
) {
  return {
    guard,
    generator: (field: TOutput, indent: number) => {
      if (guard(field)) {
        return generator(field, indent)
      }
      throw new Error('Guard check failed in generator')
    },
  }
}
