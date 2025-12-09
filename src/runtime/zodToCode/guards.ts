import type * as z4 from 'zod/v4/core'

function isZodCheckDef(def: unknown): def is { check: string } {
  return typeof def === 'object' && def !== null && 'check' in def
}

export function hasZodType(schema: unknown, type: string): boolean {
  return (
    typeof schema === 'object' &&
    schema !== null &&
    '_zod' in schema &&
    typeof schema._zod === 'object' &&
    schema._zod !== null &&
    'def' in schema._zod &&
    typeof schema._zod.def === 'object' &&
    schema._zod.def !== null &&
    'type' in schema._zod.def &&
    schema._zod.def.type === type
  )
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

export function isZodGreaterThanCheckDef(
  def: unknown
): def is z4.$ZodCheckGreaterThanDef {
  return isZodCheckDef(def) && def.check === 'greater_than'
}

export function isZodLessThanCheckDef(
  def: unknown
): def is z4.$ZodCheckLessThanDef {
  return isZodCheckDef(def) && def.check === 'less_than'
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

export function isStringFormatDef(def: unknown): def is z4.$ZodStringFormatDef {
  return isZodCheckDef(def) && def.check === 'string_format'
}
