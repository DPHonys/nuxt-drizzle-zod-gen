import type * as z4 from 'zod/v4/core'

// TODO rewrite
export const validationCheckGenerators = {
  min_length: (value: z4.util.Numeric) => `.min(${value})`,
  max_length: (value: z4.util.Numeric) => `.max(${value})`,
  greater_than: (value: z4.util.Numeric) => `.gt(${value})`,
  greater_than_or_equal: (value: z4.util.Numeric) => `.gte(${value})`,
  less_than: (value: z4.util.Numeric) => `.lt(${value})`,
  less_than_or_equal: (value: z4.util.Numeric) => `.lte(${value})`,
  length_equals: (value: z4.util.Numeric) => `.length(${value})`,
} as const
