import { extractDrizzleTables, type DrizzleTable } from './drizzle/tables'
import {
  extractRefinements,
  type TableRefinements,
} from './drizzle/refinements'

export interface TableWithRefinements {
  table: DrizzleTable
  refinements: TableRefinements
}

export async function extractTablesWithRefinements(schemaFiles: string[]) {
  const [tables, refinements] = await Promise.all([
    extractDrizzleTables(schemaFiles),
    extractRefinements(schemaFiles),
  ])

  const result = new Map<string, TableWithRefinements>()

  for (const [exportName, table] of tables.entries()) {
    result.set(exportName, {
      table,
      refinements: refinements.get(exportName) || {},
    })
  }

  return result
}
