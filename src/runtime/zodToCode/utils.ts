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
  isStringFormatDef,
  isZodGreaterThanCheckDef,
  isZodLessThanCheckDef,
} from './guards'
import { checkGenerators } from './generators/checks'
import { formatTypeGenerator } from './generators/formats'

export function zodFieldToString<T extends z4.$ZodType>(field: T, indent = 0) {
  let baseType = ''
  const def = field._zod.def
  const type = def.type

  // Handle basic types
  // TODO: number has formats - its not so basic after all
  if (
    type in basicTypeGenerators &&
    ('check' in def === false || type === 'number')
  ) {
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
    // TODO: no any
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

  if (isStringFormatDef(def)) {
    baseType = formatTypeGenerator.string_format(def)
  }

  // TODO Handle refinements
  if (def.checks) {
    for (const check of def.checks) {
      const checkDef = check._zod.def
      logger.info(
        `Processing check of type: ${checkDef.check}`,
        JSON.stringify(checkDef)
      )
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
