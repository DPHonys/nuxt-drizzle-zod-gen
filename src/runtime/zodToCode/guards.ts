import type * as z4 from 'zod/v4/core'

function isZodCheckDef(def: unknown): def is { check: string } {
  return typeof def === 'object' && def !== null && 'check' in def
}

export function isMinLengthCheckDef(
  def: unknown
): def is z4.$ZodCheckMinLengthDef {
  return isZodCheckDef(def) && def.check === 'min_length'
}

export function isMaxLengthCheckDef(
  def: unknown
): def is z4.$ZodCheckMaxLengthDef {
  return isZodCheckDef(def) && def.check === 'max_length'
}

export function isLengthEqualsCheckDef(
  def: unknown
): def is z4.$ZodCheckLengthEqualsDef {
  return isZodCheckDef(def) && def.check === 'length_equals'
}

export function isZodOptionalDef(def: unknown): def is z4.$ZodOptionalDef {
  return (
    typeof def === 'object' &&
    def !== null &&
    'type' in def &&
    def.type === 'optional'
  )
}

export function isZodNullableDef(def: unknown): def is z4.$ZodNullableDef {
  return (
    typeof def === 'object' &&
    def !== null &&
    'type' in def &&
    def.type === 'nullable'
  )
}

export function isZodDefaultDef(def: unknown): def is z4.$ZodDefaultDef {
  return (
    typeof def === 'object' &&
    def !== null &&
    'type' in def &&
    def.type === 'default'
  )
}

export function isZodCatchDef(def: unknown): def is z4.$ZodCatchDef {
  return (
    typeof def === 'object' &&
    def !== null &&
    'type' in def &&
    def.type === 'catch'
  )
}

export function isZodReadonlyDef(def: unknown): def is z4.$ZodReadonlyDef {
  return (
    typeof def === 'object' &&
    def !== null &&
    'type' in def &&
    def.type === 'readonly'
  )
}
