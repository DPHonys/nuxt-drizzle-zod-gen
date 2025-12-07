import { zodToCode } from './zodToCode/index'
import { createSchemaFactory } from 'drizzle-zod'
import {
  extractTablesWithRefinements,
  type TableWithRefinements,
} from './extract'
import type { z as ZodType } from 'zod'
import { logger } from './utils/logger'

export interface GeneratedSchema {
  exportName: string
  selectCode: string
  insertCode: string
  updateCode: string
}

export interface GenerateZodCodeOptions {
  zodInstance: typeof ZodType
}

function evalWithZod(code: string, z: typeof ZodType) {
  return new Function('z', `return (${code})`)(z)
}

export function generateZodCode(
  tableData: TableWithRefinements,
  options: GenerateZodCodeOptions
): GeneratedSchema {
  const { table, refinements } = tableData
  const z = options.zodInstance

  // Parse refinement strings into objects if they exist
  const selectRefinement = refinements.select
    ? evalWithZod(refinements.select, z)
    : undefined
  const insertRefinement = refinements.insert
    ? evalWithZod(refinements.insert, z)
    : undefined
  const updateRefinement = refinements.update
    ? evalWithZod(refinements.update, z)
    : undefined

  const { createInsertSchema, createSelectSchema, createUpdateSchema } =
    createSchemaFactory({ zodInstance: z })

  // Generate schemas with refinements passed directly
  const selectSchema = createSelectSchema(table.table, selectRefinement)
  const insertSchema = createInsertSchema(table.table, insertRefinement)
  const updateSchema = createUpdateSchema(table.table, updateRefinement)

  // Convert to code strings
  const selectCode = zodToCode(selectSchema)
  const insertCode = zodToCode(insertSchema)
  const updateCode = zodToCode(updateSchema)

  return {
    exportName: table.exportName,
    selectCode,
    insertCode,
    updateCode,
  }
}

export function generateFileContent(schemas: GeneratedSchema[]) {
  const imports = `import { z } from "zod";\n\n`

  const exports = schemas
    .map((schema) => {
      return `
// ${schema.exportName} schemas
export const ${schema.exportName}SelectSchema = ${schema.selectCode};

export const ${schema.exportName}InsertSchema = ${schema.insertCode};

export const ${schema.exportName}UpdateSchema = ${schema.updateCode};
`.trim()
    })
    .join('\n\n')

  return imports + exports + '\n'
}

export async function generateAndWriteSchemas(
  path: string,
  zod: typeof ZodType
) {
  const tablesWithRefinements = await extractTablesWithRefinements([path])
  logger.debug('Extracted tables with refinements:', tablesWithRefinements)
  const generatedSchemas = []

  for (const tableData of tablesWithRefinements.values()) {
    try {
      const generated = generateZodCode(tableData, {
        zodInstance: zod,
      })
      generatedSchemas.push(generated)
    } catch (error) {
      logger.error(
        `Error generating Zod code for table ${tableData.table.exportName}:`,
        error
      )
    }
  }

  return generateFileContent(generatedSchemas)
}
