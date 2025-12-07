import type * as z4 from 'zod/v4/core'
import { zodFieldToString } from '../utils'
import {
  isZodCatchDef,
  isZodDefaultDef,
  isZodNullableDef,
  isZodOptionalDef,
  isZodReadonlyDef,
} from '../guards'
import { logger } from '@nuxt/kit'

// TODO: Nullish

export const modifierGenerators: Partial<
  Record<z4.$ZodTypeDef['type'], (field: z4.$ZodType, indent: number) => string>
> = {
  optional: (field: z4.$ZodType, indent: number) => {
    const def = field._zod.def
    if (isZodOptionalDef(def)) {
      return `${zodFieldToString(def.innerType, indent)}.optional()`
    }
    throw new Error('Invalid Zod optional definition')
  },
  nullable: (field: z4.$ZodType, indent: number) => {
    const def = field._zod.def
    if (isZodNullableDef(def)) {
      return `${zodFieldToString(def.innerType, indent)}.nullable()`
    }
    throw new Error('Invalid Zod nullable definition')
  },
  readonly: (field: z4.$ZodType, indent: number) => {
    const def = field._zod.def
    if (isZodReadonlyDef(def)) {
      return `${zodFieldToString(def.innerType, indent)}.readonly()`
    }
    throw new Error('Invalid Zod readonly definition')
  },
  default: (field: z4.$ZodType, indent: number) => {
    const def = field._zod.def
    if (isZodDefaultDef(def)) {
      const defaultValue =
        typeof def.defaultValue === 'function'
          ? def.defaultValue()
          : def.defaultValue
      return `${zodFieldToString(def.innerType, indent)}.default(${JSON.stringify(defaultValue)})`
    }
    throw new Error('Invalid Zod default definition')
  },
  catch: (field: z4.$ZodType, indent: number) => {
    const def = field._zod.def
    logger.info('Processing catch modifier: ' + JSON.stringify(def))
    if (isZodCatchDef(def)) {
      const catchValue =
        // TODO: revisit in future - would need to somehow stringify the function
        // @ts-expect-error Zod expects to pass context with errors into the function but we make it static here
        typeof def.catchValue === 'function' ? def.catchValue() : def.catchValue
      return `${zodFieldToString(def.innerType, indent)}.catch(${JSON.stringify(catchValue)})`
    }
    throw new Error('Invalid Zod catch definition')
  },
  // Note: branded may not be a separate type in Zod v4 type definitions
  // branded: (
  //   field: z4.$ZodType,
  //   indent: number
  // ) => {
  //   const def = getDef(field)
  //   return `${zodFieldToString(def.type, indent)}.brand()`
  // },
} as const
