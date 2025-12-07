import { is, Table, getTableName } from 'drizzle-orm'
import { createJiti } from 'jiti'
import { resolve } from 'pathe'
import { logger } from '../utils/logger'
import { pascalCase } from 'scule'

export interface DrizzleTable {
  name: string
  exportName: string
  table: Table
  filePath: string
}

function isDrizzleTable(value: unknown): value is Table {
  return is(value, Table)
}

export async function extractDrizzleTables(schemaFiles: string[]) {
  const jiti = createJiti(import.meta.url, {
    interopDefault: true,
    moduleCache: false,
  })

  const tables = new Map<string, DrizzleTable>()

  for (const file of schemaFiles) {
    const absolutePath = resolve(file)

    try {
      const module = await jiti.import(absolutePath)

      if (typeof module !== 'object' || module === null) {
        continue
      }

      for (const [name, value] of Object.entries(module)) {
        if (isDrizzleTable(value)) {
          const exportName = pascalCase(name)
          const tableName = getTableName(value)

          tables.set(exportName, {
            name: tableName,
            exportName,
            table: value,
            filePath: file,
          })
        }
      }
    } catch (error) {
      logger.error(`Failed to import ${file}:`, error)
    }
  }

  return tables
}
