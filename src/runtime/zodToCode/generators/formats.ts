import type * as z4 from 'zod/v4/core'
import { getErrorMessage } from './checks'

// TODO: no any - do proper type guards

export const formatTypeGenerator = {
  string_format: (def: z4.$ZodCheckStringFormatDef) => {
    const errorMessage = getErrorMessage(def.error, 'invalid_string')
    const format = def.format

    // Handle specific string formats with parameters
    if (format === 'datetime' && 'precision' in def) {
      const precision = (def as any).precision
      const offset = (def as any).offset
      const local = (def as any).local

      const options: string[] = []
      if (precision !== null && precision !== undefined) {
        options.push(`precision: ${precision}`)
      }
      if (offset) options.push('offset: true')
      if (local) options.push('local: true')

      const optionsStr = options.length > 0 ? `{ ${options.join(', ')} }` : ''
      return errorMessage
        ? `.datetime(${optionsStr}, "${errorMessage}")`
        : optionsStr
          ? `.datetime(${optionsStr})`
          : '.datetime()'
    }

    if (format === 'time' && 'precision' in def) {
      const precision = (def as any).precision
      if (precision !== null && precision !== undefined) {
        return errorMessage
          ? `.time({ precision: ${precision} }, "${errorMessage}")`
          : `.time({ precision: ${precision} })`
      }
    }

    if (format === 'uuid' && 'version' in def) {
      const version = (def as any).version
      if (version) {
        return errorMessage
          ? `.uuid({ version: "${version}" }, "${errorMessage}")`
          : `.uuid({ version: "${version}" })`
      }
    }

    if (
      format === 'url' &&
      ('hostname' in def || 'protocol' in def || 'normalize' in def)
    ) {
      const hostname = (def as any).hostname
      const protocol = (def as any).protocol
      const normalize = (def as any).normalize

      const options: string[] = []
      if (hostname) options.push(`hostname: ${hostname}`)
      if (protocol) options.push(`protocol: ${protocol}`)
      if (normalize) options.push(`normalize: ${normalize}`)

      if (options.length > 0) {
        const optionsStr = `{ ${options.join(', ')} }`
        return errorMessage
          ? `.url(${optionsStr}, "${errorMessage}")`
          : `.url(${optionsStr})`
      }
    }

    if (format === 'ip' && 'version' in def) {
      const version = (def as any).version
      if (version === 'v4') {
        return errorMessage
          ? `.ip({ version: "v4" }, "${errorMessage}")`
          : '.ip({ version: "v4" })'
      }
      if (version === 'v6') {
        return errorMessage
          ? `.ip({ version: "v6" }, "${errorMessage}")`
          : '.ip({ version: "v6" })'
      }
    }

    if (format === 'ipv4') {
      return errorMessage
        ? `.ip({ version: "v4" }, "${errorMessage}")`
        : '.ip({ version: "v4" })'
    }

    if (format === 'ipv6') {
      return errorMessage
        ? `.ip({ version: "v6" }, "${errorMessage}")`
        : '.ip({ version: "v6" })'
    }

    if (format === 'cidrv4') {
      return errorMessage
        ? `.cidr({ version: "v4" }, "${errorMessage}")`
        : '.cidr({ version: "v4" })'
    }

    if (format === 'cidrv6') {
      return errorMessage
        ? `.cidr({ version: "v6" }, "${errorMessage}")`
        : '.cidr({ version: "v6" })'
    }

    if (format === 'mac' && 'delimiter' in def) {
      const delimiter = (def as any).delimiter
      if (delimiter) {
        return errorMessage
          ? `.mac({ delimiter: "${delimiter}" }, "${errorMessage}")`
          : `.mac({ delimiter: "${delimiter}" })`
      }
    }

    if (format === 'includes' && 'includes' in def) {
      const includes = (def as any).includes
      const position = (def as any).position
      if (position !== undefined) {
        return errorMessage
          ? `.includes("${includes}", { position: ${position} }, "${errorMessage}")`
          : `.includes("${includes}", { position: ${position} })`
      }
      return errorMessage
        ? `.includes("${includes}", "${errorMessage}")`
        : `.includes("${includes}")`
    }

    if (format === 'starts_with' && 'prefix' in def) {
      const prefix = (def as any).prefix
      return errorMessage
        ? `.startsWith("${prefix}", "${errorMessage}")`
        : `.startsWith("${prefix}")`
    }

    if (format === 'ends_with' && 'suffix' in def) {
      const suffix = (def as any).suffix
      return errorMessage
        ? `.endsWith("${suffix}", "${errorMessage}")`
        : `.endsWith("${suffix}")`
    }

    if (format === 'regex' && 'pattern' in def) {
      const pattern = (def as any).pattern
      return errorMessage
        ? `.regex(${pattern}, "${errorMessage}")`
        : `.regex(${pattern})`
    }

    // Simple format methods without parameters
    const simpleFormats: Record<string, string> = {
      email: 'email',
      url: 'url',
      emoji: 'emoji',
      uuid: 'uuid',
      guid: 'uuid', // guid is an alias for uuid
      nanoid: 'nanoid',
      cuid: 'cuid',
      cuid2: 'cuid2',
      ulid: 'ulid',
      xid: 'xid',
      ksuid: 'ksuid',
      date: 'date',
      duration: 'duration',
      base64: 'base64',
      base64url: 'base64url',
      json_string: 'jsonString',
      e164: 'e164',
      lowercase: 'toLowerCase',
      uppercase: 'toUpperCase',
      jwt: 'jwt',
      mac: 'mac',
    }

    const methodName = simpleFormats[format]
    if (methodName) {
      return errorMessage
        ? `z.${methodName}("${errorMessage}")`
        : `z.${methodName}()`
    }

    // Fallback for unknown formats
    return ''
  },
}
