import type * as z4 from 'zod/v4/core'
import { zodFieldToString } from './utils'
export {
  UnsupportedZodEffectError,
  UnsupportedZodFunctionError,
  UnsupportedZodTypeError,
} from './errors'

export function generateZodCode<T extends z4.$ZodType>(
  zodObject: T,
  indent = 0
) {
  const def = zodObject._zod.def

  if (def.type === 'object') {
    const shape = (zodObject as unknown as z4.$ZodObject)._zod.def.shape
    const entries = Object.entries(shape).map(([key, value]) => {
      return `${'  '.repeat(indent + 1)}${key}: ${zodFieldToString(value, indent + 1)}`
    })
    return `z.object({\n${entries.join(',\n')}\n${'  '.repeat(indent)}})`
  }

  return zodFieldToString(zodObject, indent)
}
