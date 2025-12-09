import { z } from 'zod'

const evalSchema = (code: string) => {
  const fn = new Function('z', `return ${code}`)
  return fn(z)
}

const compareSchemas = (originalSchema: z.ZodType, generatedCode: string) => {
  const regeneratedSchema = evalSchema(generatedCode)
  const originalJsonSchema = z.toJSONSchema(originalSchema)
  const regeneratedJsonSchema = z.toJSONSchema(regeneratedSchema)
  return { originalJsonSchema, regeneratedJsonSchema }
}

export { evalSchema, compareSchemas }
