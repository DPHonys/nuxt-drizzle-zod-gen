/*
import {
  UnsupportedZodEffectError,
  UnsupportedZodFunctionError,
  UnsupportedZodTypeError,
} from './errors'
 */
import { logger } from '../utils/logger'
import { UnsupportedZodFunctionError } from './errors'
import { basicTypeGenerators } from './generators/basic'
import { complexTypeGenerators } from './generators/complex'
import { modifierGenerators } from './generators/modifiers'
import { validationCheckGenerators } from './generators/validation'
import type * as z4 from 'zod/v4/core'
import {
  isLengthEqualsCheckDef,
  isMaxLengthCheckDef,
  isMinLengthCheckDef,
  isZodGreaterThanCheckDef,
  isZodLessThanCheckDef,
} from './guards'
import { checkGenerators } from './generators/checks'

export function zodFieldToString<T extends z4.$ZodType>(field: T, indent = 0) {
  logger.info(`Processing field of type: ${field._zod.def.type}`)
  let baseType = ''
  const def = field._zod.def
  const type = def.type

  // Handle basic types
  if (type in basicTypeGenerators) {
    const generator = basicTypeGenerators[type]
    baseType = generator ? generator() : ''
  }
  // Handle modifiers
  else if (type in modifierGenerators) {
    const generator = modifierGenerators[type]
    return generator ? generator(field, indent) : ''
  }
  // Handle complex types
  else if (type in complexTypeGenerators) {
    const generator = complexTypeGenerators[type]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    baseType = generator ? generator(field as any, indent) : ''
  }
  /*
  // Handle effects
  else if (type === 'effects') {
    if (def.effect.type === 'describe') {
      const innerType = zodFieldToString(def.innerType, indent)
      return `${innerType}.describe("${def.effect.description}")`
    }
    if (def.effect.type === 'transform') {
      throw new UnsupportedZodEffectError('transform')
    }
    if (def.effect.type === 'refinement') {
      throw new UnsupportedZodFunctionError('refine')
    }
    throw new UnsupportedZodEffectError(def.effect.type)
  } else {
    throw new UnsupportedZodTypeError(typeName)
  }
    */

  // TODO Handle refinements
  if (def.checks) {
    for (const check of def.checks) {
      const checkDef = check._zod.def
      if (isMinLengthCheckDef(checkDef)) {
        baseType += checkGenerators.min_length(checkDef)
        continue
      } else if (isMaxLengthCheckDef(checkDef)) {
        baseType += checkGenerators.max_length(checkDef)
        continue
      }

      if (checkDef.check in validationCheckGenerators) {
        if (isMaxLengthCheckDef(checkDef)) {
          baseType += validationCheckGenerators.max_length(checkDef.maximum)
        } else if (isLengthEqualsCheckDef(checkDef)) {
          baseType += validationCheckGenerators.length_equals(checkDef.length)
        } else if (isZodGreaterThanCheckDef(checkDef)) {
          baseType += validationCheckGenerators.greater_than(checkDef.value)
        } else if (isZodLessThanCheckDef(checkDef)) {
          baseType += validationCheckGenerators.less_than(checkDef.value)
        } else {
          throw new UnsupportedZodFunctionError(checkDef.check)
        }
      }
    }
  }

  return baseType
}
