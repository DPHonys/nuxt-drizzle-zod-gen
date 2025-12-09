import type * as z4 from 'zod/v4/core'
import { hasFormat, hasZodType } from '../../guards'
import { createGenerator } from './utils'
import { UnsupportedZodTypeWithFormatError } from '../../errors'

function isZodString(field: unknown): field is z4.$ZodString {
  return hasZodType(field, 'string')
}

function isZodStringFormat(
  schema: z4.$ZodString
): schema is z4.$ZodStringFormat {
  const def = schema._zod.def
  return (
    'format' in def &&
    !!def.format &&
    'check' in def &&
    def.check === 'string_format'
  )
}

export function generateStringType<T extends z4.$ZodType>(
  field: T,
  indent: number
) {
  if (isZodString(field)) {
    if (isZodStringFormat(field)) {
      const format = field._zod.def.format
      if (isStringFormatGeneratorKey(format)) {
        const generator = stringFormatGenerators[format]
        if (generator) {
          return generator.generator(field, indent)
        }
      } else {
        throw new UnsupportedZodTypeWithFormatError(field._zod.def.type, format)
      }
    }
    return '.string()'
  }
  throw new Error('SHOULD NOT HAPPEN - Not a ZodString')
}

export function isStringFormatGeneratorKey(
  type: string
): type is keyof typeof stringFormatGenerators {
  return type in stringFormatGenerators
}

// TODO: these are missing for now (probably they are handled as checks?)  'json_string' | 'lowercase' | 'uppercase' | 'regex' | 'starts_with' | 'ends_with' | 'includes'
// TODO: work with field and indent?
const stringFormatGenerators: Partial<{
  [K in z4.$ZodStringFormats]: ReturnType<
    typeof createGenerator<z4.$ZodStringFormat>
  >
}> = {
  email: createGenerator<z4.$ZodStringFormat, z4.$ZodEmail>(
    (schema): schema is z4.$ZodEmail => hasFormat(schema, 'email'),
    (_field, _indent) => `.email()`
  ),
  url: createGenerator<z4.$ZodStringFormat, z4.$ZodURL>(
    (schema): schema is z4.$ZodURL => hasFormat(schema, 'url'),
    (_field, _indent) => `.url()`
  ),
  emoji: createGenerator<z4.$ZodStringFormat, z4.$ZodEmoji>(
    (schema): schema is z4.$ZodEmoji => hasFormat(schema, 'emoji'),
    (_field, _indent) => `.emoji()`
  ),
  uuid: createGenerator<z4.$ZodStringFormat, z4.$ZodUUID>(
    (schema): schema is z4.$ZodUUID => hasFormat(schema, 'uuid'),
    (_field, _indent) => `.uuid()`
  ),
  guid: createGenerator<z4.$ZodStringFormat, z4.$ZodGUID>(
    (schema): schema is z4.$ZodGUID => hasFormat(schema, 'guid'),
    (_field, _indent) => `.guid()`
  ),
  nanoid: createGenerator<z4.$ZodStringFormat, z4.$ZodNanoID>(
    (schema): schema is z4.$ZodNanoID => hasFormat(schema, 'nanoid'),
    (_field, _indent) => `.nanoid()`
  ),
  cuid: createGenerator<z4.$ZodStringFormat, z4.$ZodCUID>(
    (schema): schema is z4.$ZodCUID => hasFormat(schema, 'cuid'),
    (_field, _indent) => `.cuid()`
  ),
  cuid2: createGenerator<z4.$ZodStringFormat, z4.$ZodCUID2>(
    (schema): schema is z4.$ZodCUID2 => hasFormat(schema, 'cuid2'),
    (_field, _indent) => `.cuid2()`
  ),
  ulid: createGenerator<z4.$ZodStringFormat, z4.$ZodULID>(
    (schema): schema is z4.$ZodULID => hasFormat(schema, 'ulid'),
    (_field, _indent) => `.ulid()`
  ),
  xid: createGenerator<z4.$ZodStringFormat, z4.$ZodXID>(
    (schema): schema is z4.$ZodXID => hasFormat(schema, 'xid'),
    (_field, _indent) => `.xid()`
  ),
  ksuid: createGenerator<z4.$ZodStringFormat, z4.$ZodKSUID>(
    (schema): schema is z4.$ZodKSUID => hasFormat(schema, 'ksuid'),
    (_field, _indent) => `.ksuid()`
  ),
  ipv4: createGenerator<z4.$ZodStringFormat, z4.$ZodIPv4>(
    (schema): schema is z4.$ZodIPv4 => hasFormat(schema, 'ipv4'),
    (_field, _indent) => `.ipv4()`
  ),
  ipv6: createGenerator<z4.$ZodStringFormat, z4.$ZodIPv6>(
    (schema): schema is z4.$ZodIPv6 => hasFormat(schema, 'ipv6'),
    (_field, _indent) => `.ipv6()`
  ),
  cidrv4: createGenerator<z4.$ZodStringFormat, z4.$ZodCIDRv4>(
    (schema): schema is z4.$ZodCIDRv4 => hasFormat(schema, 'cidrv4'),
    (_field, _indent) => `.cidrv4()`
  ),
  cidrv6: createGenerator<z4.$ZodStringFormat, z4.$ZodCIDRv6>(
    (schema): schema is z4.$ZodCIDRv6 => hasFormat(schema, 'cidrv6'),
    (_field, _indent) => `.cidrv6()`
  ),
  base64: createGenerator<z4.$ZodStringFormat, z4.$ZodBase64>(
    (schema): schema is z4.$ZodBase64 => hasFormat(schema, 'base64'),
    (_field, _indent) => `.base64()`
  ),
  base64url: createGenerator<z4.$ZodStringFormat, z4.$ZodBase64URL>(
    (schema): schema is z4.$ZodBase64URL => hasFormat(schema, 'base64url'),
    (_field, _indent) => `.base64url()`
  ),
  jwt: createGenerator<z4.$ZodStringFormat, z4.$ZodJWT>(
    (schema): schema is z4.$ZodJWT => hasFormat(schema, 'jwt'),
    (_field, _indent) => `.jwt()`
  ),
  e164: createGenerator<z4.$ZodStringFormat, z4.$ZodE164>(
    (schema): schema is z4.$ZodE164 => hasFormat(schema, 'e164'),
    (_field, _indent) => `.e164()`
  ),
  datetime: createGenerator<z4.$ZodStringFormat, z4.$ZodISODateTime>(
    (schema): schema is z4.$ZodISODateTime => hasFormat(schema, 'datetime'),
    (_field, _indent) => `.datetime()`
  ),
  date: createGenerator<z4.$ZodStringFormat, z4.$ZodISODate>(
    (schema): schema is z4.$ZodISODate => hasFormat(schema, 'date'),
    (_field, _indent) => `.date()`
  ),
  time: createGenerator<z4.$ZodStringFormat, z4.$ZodISOTime>(
    (schema): schema is z4.$ZodISOTime => hasFormat(schema, 'time'),
    (_field, _indent) => `.time()`
  ),
  duration: createGenerator<z4.$ZodStringFormat, z4.$ZodISODuration>(
    (schema): schema is z4.$ZodISODuration => hasFormat(schema, 'duration'),
    (_field, _indent) => `.duration()`
  ),
} as const
