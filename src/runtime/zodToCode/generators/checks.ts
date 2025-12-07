import type * as z4 from 'zod/v4/core'

// TODO: this might not work with fully custom error maps

function getErrorMessage(
  errorFn: z4.$ZodErrorMap<never> | undefined,
  code: string
) {
  if (!errorFn) return undefined

  try {
    const result = errorFn({ code } as never)
    const message = typeof result === 'string' ? result : result?.message
    // Escape quotes and backslashes for string interpolation
    return message?.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
  } catch {
    return undefined
  }
}

function formatMethodCall(
  method: string,
  value: z4.util.Numeric,
  errorMessage?: string
) {
  return errorMessage
    ? `.${method}(${value}, "${errorMessage}")`
    : `.${method}(${value})`
}

export const checkGenerators = {
  min_length: (def: z4.$ZodCheckMinLengthDef) => {
    const errorMessage = getErrorMessage(def.error, 'too_small')
    return formatMethodCall('min', def.minimum, errorMessage)
  },
  max_length: (def: z4.$ZodCheckMaxLengthDef) => {
    const errorMessage = getErrorMessage(def.error, 'too_big')
    return formatMethodCall('max', def.maximum, errorMessage)
  },
} as const
