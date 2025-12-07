import type * as z4 from 'zod/v4/core'
import { zodFieldToString } from '../utils'
import type { ZodTypeDefMap } from '../types'
import {
  isLengthEqualsCheckDef,
  isMaxLengthCheckDef,
  isMinLengthCheckDef,
} from '../guards'
import { validationCheckGenerators } from './validation'

export const complexTypeGenerators: {
  [K in keyof ZodTypeDefMap]?: (
    field: ZodTypeDefMap[K],
    indent: number
  ) => string
} = {
  array: (field: z4.$ZodArray, indent: number) => {
    const def = field._zod.def
    const elementSchema = def.element
    let baseType = `z.array(${zodFieldToString(elementSchema, indent)})`
    const checks = def.checks || []

    if (checks.length) {
      for (const check of checks) {
        const checkDef = check._zod.def
        console.log(check._zod.def)
        if (isMinLengthCheckDef(checkDef)) {
          baseType += validationCheckGenerators.min_length(checkDef.minimum)
        } else if (isMaxLengthCheckDef(checkDef)) {
          baseType += validationCheckGenerators.max_length(checkDef.maximum)
        } else if (isLengthEqualsCheckDef(checkDef)) {
          baseType += validationCheckGenerators.length_equals(checkDef.length)
        }
      }
    }
    return baseType
  },
  object: (field: z4.$ZodObject, indent: number) => {
    const def = field._zod.def
    const shape = def.shape
    const entries = Object.entries(shape).map(([key, value]) => {
      return `${'  '.repeat(indent + 1)}${key}: ${zodFieldToString(value as z4.$ZodType, indent + 1)}`
    })
    return `z.object({\n${entries.join(',\n')}\n${'  '.repeat(indent)}})`
  },
  enum: (field: z4.$ZodEnum) => {
    const def = field._zod.def
    const values = Array.isArray(def.entries)
      ? def.entries
      : Object.values(def.entries)
    return `z.enum([${values.map((v) => JSON.stringify(v)).join(', ')}] as const)`
  },
  literal: (field: z4.$ZodLiteral) => {
    const def = field._zod.def
    if (def.values.length === 1) {
      return `z.literal(${JSON.stringify(def.values[0])})`
    } else {
      return `z.literal(${JSON.stringify(def.values)})`
    }
  },
  union: (field: z4.$ZodUnion, indent: number) => {
    const def = field._zod.def
    // In Zod v4, access union options via def.options
    const options = def.options
    const optionStrings = options.map((opt: z4.$ZodType) =>
      zodFieldToString(opt, indent)
    )
    return `z.union([${optionStrings.join(', ')}])`
  },
  intersection: (field: z4.$ZodIntersection, indent: number) => {
    const def = field._zod.def
    const leftType = zodFieldToString(def.left, indent)
    const rightType = zodFieldToString(def.right, indent)
    return `${leftType}.and(${rightType})`
  },
  tuple: (field: z4.$ZodTuple, indent: number) => {
    const def = field._zod.def
    return `z.tuple([${def.items.map((item: z4.$ZodType) => zodFieldToString(item, indent)).join(', ')}])`
  },
  record: (field: z4.$ZodRecord, indent: number) => {
    const def = field._zod.def
    return `z.record(${zodFieldToString(def.keyType, indent)}, ${zodFieldToString(def.valueType, indent)})`
  },
  map: (field: z4.$ZodMap, indent: number) => {
    const def = field._zod.def
    return `z.map(${zodFieldToString(def.keyType, indent)}, ${zodFieldToString(def.valueType, indent)})`
  },
  set: (field: z4.$ZodSet, indent: number) => {
    const def = field._zod.def
    return `z.set(${zodFieldToString(def.valueType, indent)})`
  },
  lazy: () => 'z.lazy(() => z.string())',
  /*
  discriminatedUnion: (field: z4.$ZodDiscriminatedUnion, indent: number) => {
    const def = field._zod.def
    const options = def.options
    const optionStrings = options.map((opt: z4.$ZodType) =>
      zodFieldToString(opt, indent)
    )
    return `z.discriminatedUnion("${def.discriminator}", [${optionStrings.join(', ')}])`
  },
  */
  pipe: (field: z4.$ZodPipe, indent: number) => {
    const def = field._zod.def
    const inType = zodFieldToString(def.in, indent)
    const outType = zodFieldToString(def.out, indent)
    return `${inType}.pipe(${outType})`
  },
} as const
