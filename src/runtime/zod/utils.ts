import type * as z4 from 'zod/v4/core'
import { isTypeGeneratorKey, typeGenerators } from './generators/types'

export function zodFieldToString<T extends z4.$ZodType>(field: T, indent = 0) {
  let output = 'z'
  const def = field._zod.def
  const type = def.type

  if (isTypeGeneratorKey(type)) {
    const generator = typeGenerators[type]
    if (generator) {
      output += generator(field, indent)
    }
  }

  return output
}
