import type * as z4 from 'zod/v4/core'

type ZodTypeDefMapInternal = {
  string: z4.$ZodString
  number: z4.$ZodNumber
  bigint: z4.$ZodBigInt
  boolean: z4.$ZodBoolean
  date: z4.$ZodDate
  symbol: z4.$ZodSymbol
  undefined: z4.$ZodUndefined
  null: z4.$ZodNull
  any: z4.$ZodAny
  unknown: z4.$ZodUnknown
  never: z4.$ZodNever
  void: z4.$ZodVoid
  array: z4.$ZodArray
  object: z4.$ZodObject
  union: z4.$ZodUnion
  intersection: z4.$ZodIntersection
  tuple: z4.$ZodTuple
  record: z4.$ZodRecord
  map: z4.$ZodMap
  set: z4.$ZodSet
  function: z4.$ZodFunction
  lazy: z4.$ZodLazy
  literal: z4.$ZodLiteral
  enum: z4.$ZodEnum
  optional: z4.$ZodOptional
  nullable: z4.$ZodNullable
  default: z4.$ZodDefault
  catch: z4.$ZodCatch
  readonly: z4.$ZodReadonly
  pipe: z4.$ZodPipe
  transform: z4.$ZodTransform
  custom: z4.$ZodType
  nan: z4.$ZodNaN
  int: z4.$ZodType
  file: z4.$ZodType
  nonoptional: z4.$ZodType
  prefault: z4.$ZodType
  success: z4.$ZodType
  template_literal: z4.$ZodType
}

export type ZodTypeDefMap = {
  [K in z4.$ZodTypeDef['type']]: K extends keyof ZodTypeDefMapInternal
    ? ZodTypeDefMapInternal[K]
    : z4.$ZodType
}
