import { logger } from '../utils/logger'
import { existsSync } from 'node:fs'
import { loadFile } from 'magicast'
import { join } from 'pathe'

export function findDrizzleConfig(rootDir: string) {
  const extensions = ['ts', 'js', 'mjs']

  logger.debug(`Searching for drizzle config in: ${rootDir}`)

  for (const ext of extensions) {
    const configPath = join(rootDir, `drizzle.config.${ext}`)
    if (existsSync(configPath)) {
      logger.info(`Found drizzle config at: ${configPath}`)
      return configPath
    }
  }

  logger.warn(`No drizzle config found in: ${rootDir}`)
  return undefined
}

export async function getDrizzleSchemaPathFromConfig(
  drizzleConfigPath: string
) {
  logger.debug(`Loading drizzle config from: ${drizzleConfigPath}`)

  try {
    const config = await loadFile(drizzleConfigPath)

    if (config.exports.default.$type === 'function-call') {
      const args = config.exports.default.$args
      if (args && args.length > 0 && args[0].schema) {
        const schema = args[0].schema
        if (typeof schema !== 'string') {
          logger.error('Schema path in drizzle config is not a string')
          return undefined
        }
        logger.info(`Extracted schema path: ${schema}`)
        return schema
      }
    }

    logger.warn('No schema path found in drizzle config')
    return undefined
  } catch (error) {
    logger.error(
      `Failed to load drizzle config from ${drizzleConfigPath}: ${error}`
    )
    return undefined
  }
}
