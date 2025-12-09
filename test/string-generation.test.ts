import { describe, it, expect } from 'vitest'
import { z } from 'zod'
import { generateZodCode } from '../src/runtime/zod/index'
import { compareSchemas } from './utils/evalZodSchema'

describe('generateZodCode - String Types', () => {
  describe('basic string', () => {
    it('should generate code for z.string()', () => {
      const schema = z.string()
      const generatedCode = generateZodCode(schema)

      expect(generatedCode).toBe('z.string()')

      const { originalJsonSchema, regeneratedJsonSchema } = compareSchemas(
        schema,
        generatedCode
      )
      expect(regeneratedJsonSchema).toEqual(originalJsonSchema)
    })
  })

  describe('string formats', () => {
    it('should generate code for z.email()', () => {
      const schema = z.email()
      const generatedCode = generateZodCode(schema)

      expect(generatedCode).toBe('z.email()')

      const { originalJsonSchema, regeneratedJsonSchema } = compareSchemas(
        schema,
        generatedCode
      )
      expect(regeneratedJsonSchema).toEqual(originalJsonSchema)
    })

    it('should generate code for z.url()', () => {
      const schema = z.url()
      const generatedCode = generateZodCode(schema)

      expect(generatedCode).toBe('z.url()')

      const { originalJsonSchema, regeneratedJsonSchema } = compareSchemas(
        schema,
        generatedCode
      )
      expect(regeneratedJsonSchema).toEqual(originalJsonSchema)
    })

    it('should generate code for z.uuid()', () => {
      const schema = z.uuid()
      const generatedCode = generateZodCode(schema)

      expect(generatedCode).toBe('z.uuid()')

      const { originalJsonSchema, regeneratedJsonSchema } = compareSchemas(
        schema,
        generatedCode
      )
      expect(regeneratedJsonSchema).toEqual(originalJsonSchema)
    })

    it('should generate code for z.guid()', () => {
      const schema = z.guid()
      const generatedCode = generateZodCode(schema)

      expect(generatedCode).toBe('z.guid()')

      const { originalJsonSchema, regeneratedJsonSchema } = compareSchemas(
        schema,
        generatedCode
      )
      expect(regeneratedJsonSchema).toEqual(originalJsonSchema)
    })

    it('should generate code for z.emoji()', () => {
      const schema = z.emoji()
      const generatedCode = generateZodCode(schema)

      expect(generatedCode).toBe('z.emoji()')

      const { originalJsonSchema, regeneratedJsonSchema } = compareSchemas(
        schema,
        generatedCode
      )
      expect(regeneratedJsonSchema).toEqual(originalJsonSchema)
    })

    it('should generate code for z.cuid()', () => {
      const schema = z.cuid()
      const generatedCode = generateZodCode(schema)

      expect(generatedCode).toBe('z.cuid()')

      const { originalJsonSchema, regeneratedJsonSchema } = compareSchemas(
        schema,
        generatedCode
      )
      expect(regeneratedJsonSchema).toEqual(originalJsonSchema)
    })

    it('should generate code for z.cuid2()', () => {
      const schema = z.cuid2()
      const generatedCode = generateZodCode(schema)

      expect(generatedCode).toBe('z.cuid2()')

      const { originalJsonSchema, regeneratedJsonSchema } = compareSchemas(
        schema,
        generatedCode
      )
      expect(regeneratedJsonSchema).toEqual(originalJsonSchema)
    })

    it('should generate code for z.ulid()', () => {
      const schema = z.ulid()
      const generatedCode = generateZodCode(schema)

      expect(generatedCode).toBe('z.ulid()')

      const { originalJsonSchema, regeneratedJsonSchema } = compareSchemas(
        schema,
        generatedCode
      )
      expect(regeneratedJsonSchema).toEqual(originalJsonSchema)
    })

    it('should generate code for z.nanoid()', () => {
      const schema = z.nanoid()
      const generatedCode = generateZodCode(schema)

      expect(generatedCode).toBe('z.nanoid()')
      const { originalJsonSchema, regeneratedJsonSchema } = compareSchemas(
        schema,
        generatedCode
      )
      expect(regeneratedJsonSchema).toEqual(originalJsonSchema)
    })

    it('should generate code for z.xid()', () => {
      const schema = z.xid()
      const generatedCode = generateZodCode(schema)

      expect(generatedCode).toBe('z.xid()')

      const { originalJsonSchema, regeneratedJsonSchema } = compareSchemas(
        schema,
        generatedCode
      )
      expect(regeneratedJsonSchema).toEqual(originalJsonSchema)
    })

    it('should generate code for z.ksuid()', () => {
      const schema = z.ksuid()
      const generatedCode = generateZodCode(schema)

      expect(generatedCode).toBe('z.ksuid()')
      const { originalJsonSchema, regeneratedJsonSchema } = compareSchemas(
        schema,
        generatedCode
      )
      expect(regeneratedJsonSchema).toEqual(originalJsonSchema)
    })

    it('should generate code for z.ipv4()', () => {
      const schema = z.ipv4()
      const generatedCode = generateZodCode(schema)

      expect(generatedCode).toBe('z.ipv4()')

      const { originalJsonSchema, regeneratedJsonSchema } = compareSchemas(
        schema,
        generatedCode
      )
      expect(regeneratedJsonSchema).toEqual(originalJsonSchema)
    })

    it('should generate code for z.ipv6()', () => {
      const schema = z.ipv6()
      const generatedCode = generateZodCode(schema)

      expect(generatedCode).toBe('z.ipv6()')

      const { originalJsonSchema, regeneratedJsonSchema } = compareSchemas(
        schema,
        generatedCode
      )
      expect(regeneratedJsonSchema).toEqual(originalJsonSchema)
    })

    it('should generate code for z.cidrv4()', () => {
      const schema = z.cidrv4()
      const generatedCode = generateZodCode(schema)

      expect(generatedCode).toBe('z.cidrv4()')

      const { originalJsonSchema, regeneratedJsonSchema } = compareSchemas(
        schema,
        generatedCode
      )
      expect(regeneratedJsonSchema).toEqual(originalJsonSchema)
    })

    it('should generate code for z.cidrv6()', () => {
      const schema = z.cidrv6()
      const generatedCode = generateZodCode(schema)

      expect(generatedCode).toBe('z.cidrv6()')

      const { originalJsonSchema, regeneratedJsonSchema } = compareSchemas(
        schema,
        generatedCode
      )
      expect(regeneratedJsonSchema).toEqual(originalJsonSchema)
    })

    it('should generate code for z.base64()', () => {
      const schema = z.base64()
      const generatedCode = generateZodCode(schema)

      expect(generatedCode).toBe('z.base64()')

      const { originalJsonSchema, regeneratedJsonSchema } = compareSchemas(
        schema,
        generatedCode
      )
      expect(regeneratedJsonSchema).toEqual(originalJsonSchema)
    })

    it('should generate code for z.base64url()', () => {
      const schema = z.base64url()
      const generatedCode = generateZodCode(schema)

      expect(generatedCode).toBe('z.base64url()')

      const { originalJsonSchema, regeneratedJsonSchema } = compareSchemas(
        schema,
        generatedCode
      )
      expect(regeneratedJsonSchema).toEqual(originalJsonSchema)
    })

    it('should generate code for z.jwt()', () => {
      const schema = z.jwt()
      const generatedCode = generateZodCode(schema)

      expect(generatedCode).toBe('z.jwt()')

      const { originalJsonSchema, regeneratedJsonSchema } = compareSchemas(
        schema,
        generatedCode
      )
      expect(regeneratedJsonSchema).toEqual(originalJsonSchema)
    })

    it('should generate code for z.e164()', () => {
      const schema = z.e164()
      const generatedCode = generateZodCode(schema)

      expect(generatedCode).toBe('z.e164()')

      const { originalJsonSchema, regeneratedJsonSchema } = compareSchemas(
        schema,
        generatedCode
      )
      expect(regeneratedJsonSchema).toEqual(originalJsonSchema)
    })

    /*
    TODO: check whats wrong here
    it('should generate code for z.date()', () => {
      const schema = z.date()
      const generatedCode = generateZodCode(schema)

      expect(generatedCode).toBe('z.date()')

      const { originalJsonSchema, regeneratedJsonSchema } = compareSchemas(
        schema,
        generatedCode
      )
      expect(regeneratedJsonSchema).toEqual(originalJsonSchema)
    })

    it('should generate code for z.datetime()', () => {
      const schema = z.datetime()
      const generatedCode = generateZodCode(schema)

      expect(generatedCode).toBe('z.datetime()')

      const { originalJsonSchema, regeneratedJsonSchema } = compareSchemas(
        schema,
        generatedCode
      )
      expect(regeneratedJsonSchema).toEqual(originalJsonSchema)
    })

    it('should generate code for z.time()', () => {
      const schema = z.time()
      const generatedCode = generateZodCode(schema)

      expect(generatedCode).toBe('z.time()')

      const { originalJsonSchema, regeneratedJsonSchema } = compareSchemas(
        schema,
        generatedCode
      )
      expect(regeneratedJsonSchema).toEqual(originalJsonSchema)
    })

    it('should generate code for z.duration()', () => {
      const schema = z.duration()
      const generatedCode = generateZodCode(schema)

      expect(generatedCode).toBe('z.duration()')

      const { originalJsonSchema, regeneratedJsonSchema } = compareSchemas(
        schema,
        generatedCode
      )
      expect(regeneratedJsonSchema).toEqual(originalJsonSchema)
    })
    */

    /*
    describe('chained string validations', () => {
      it('should generate code for z.string().min().max()', () => {
        const schema = z.string().min(3).max(10)
        const generatedCode = generateZodCode(schema)

        expect(generatedCode).toBe('z.string().min(3).max(10)')

        const { originalJsonSchema, regeneratedJsonSchema } = compareSchemas(
          schema,
          generatedCode
        )
        expect(regeneratedJsonSchema).toEqual(originalJsonSchema)
      })

      it('should generate code for z.email().min()', () => {
        const schema = z.email().min(5)
        const generatedCode = generateZodCode(schema)

        expect(generatedCode).toBe('z.email().min(5)')

        const { originalJsonSchema, regeneratedJsonSchema } = compareSchemas(
          schema,
          generatedCode
        )
        expect(regeneratedJsonSchema).toEqual(originalJsonSchema)
      })
    })

    describe('optional and nullable strings', () => {
      it('should generate code for z.string().optional()', () => {
        const schema = z.string().optional()
        const generatedCode = generateZodCode(schema)

        expect(generatedCode).toBe('z.string().optional()')

        const { originalJsonSchema, regeneratedJsonSchema } = compareSchemas(
          schema,
          generatedCode
        )
        expect(regeneratedJsonSchema).toEqual(originalJsonSchema)
      })

      it('should generate code for z.string().nullable()', () => {
        const schema = z.string().nullable()
        const generatedCode = generateZodCode(schema)

        expect(generatedCode).toBe('z.string().nullable()')

        const { originalJsonSchema, regeneratedJsonSchema } = compareSchemas(
          schema,
          generatedCode
        )
        expect(regeneratedJsonSchema).toEqual(originalJsonSchema)
      })

      it('should generate code for z.string().nullish()', () => {
        const schema = z.string().nullish()
        const generatedCode = generateZodCode(schema)

        expect(generatedCode).toBe('z.string().nullish()')

        const { originalJsonSchema, regeneratedJsonSchema } = compareSchemas(
          schema,
          generatedCode
        )
        expect(regeneratedJsonSchema).toEqual(originalJsonSchema)
      })
    })

    describe('string with default values', () => {
      it('should generate code for z.string().default()', () => {
        const schema = z.string().default('hello')
        const generatedCode = generateZodCode(schema)

        expect(generatedCode).toBe('z.string().default("hello")')

        const { originalJsonSchema, regeneratedJsonSchema } = compareSchemas(
          schema,
          generatedCode
        )
        expect(regeneratedJsonSchema).toEqual(originalJsonSchema)
      })

      it('should generate code for z.email().default()', () => {
        const schema = z.email().default('user@example.com')
        const generatedCode = generateZodCode(schema)

        expect(generatedCode).toBe('z.email().default("user@example.com")')

        const { originalJsonSchema, regeneratedJsonSchema } = compareSchemas(
          schema,
          generatedCode
        )
        expect(regeneratedJsonSchema).toEqual(originalJsonSchema)
      })
    })
      */
  })
})
