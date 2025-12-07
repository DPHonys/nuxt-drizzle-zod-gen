import type * as z4 from 'zod/v4/core'

// TODO: does not make sense because these can accept params
// TODO: remove types with formats
export const basicTypeGenerators: Partial<
  Record<z4.$ZodTypeDef['type'], () => string>
> = {
  string: () => 'z.string()',
  number: () => 'z.number()',
  boolean: () => 'z.boolean()',
  date: () => 'z.date()',
  bigint: () => 'z.bigint()',
  symbol: () => 'z.symbol()',
  undefined: () => 'z.undefined()',
  null: () => 'z.null()',
  void: () => 'z.void()',
  never: () => 'z.never()',
  unknown: () => 'z.unknown()',
  any: () => 'z.any()',
  nan: () => 'z.nan()',
} as const
