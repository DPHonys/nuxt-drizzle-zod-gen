import {
  defineNuxtModule,
  createResolver,
  addTemplate,
  logger,
} from '@nuxt/kit'
import { defu } from 'defu'
import {
  findDrizzleConfig,
  getDrizzleSchemaPathFromConfig,
} from './runtime/utils/drizzleConfig'

// Module options TypeScript interface definition
export interface ModuleOptions {
  /**
   * Enable debug logging
   * @default false
   */
  debug?: boolean
  /**
   * Path to the schema file
   * @example './server/database/schema.ts'
   */
  schemaPath?: string
}

const defaults: ModuleOptions = {
  debug: false,
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-drizzle-zod-gen',
    configKey: 'nuxtDrizzleZodGen',
    compatibility: {
      nuxt: '>=3.0.0',
    },
  },
  // Default configuration options of the Nuxt module
  defaults: defaults,
  async setup(_options, nuxt) {
    const resolver = createResolver(import.meta.url)

    const projectRoot = nuxt.options.rootDir
    logger.log(`Searching for drizzle.config in project root: ${projectRoot}`)
    const drizzleConfigPath = findDrizzleConfig(projectRoot)
    if (!drizzleConfigPath) {
      logger.warn('Could not find drizzle.config file in the project root.')
    }

    const drizzleSchemaPath = drizzleConfigPath
      ? await getDrizzleSchemaPathFromConfig(drizzleConfigPath)
      : undefined

    const options = defu(_options, {
      ...defaults,
      schemaPath: drizzleSchemaPath,
    })

    if (!options.schemaPath) {
      logger.error('Could not extract schema path from drizzle config.')
      return
    }

    logger.info(`Found Drizzle schema at: ${options.schemaPath}`)

    // Add template to generate Zod schemas
    addTemplate({
      filename: 'drizzle-zod-gen.ts',
      write: true,
      async getContents(_data) {
        return Promise.resolve('')
      },
    })

    // Watch for changes in the Drizzle schema files
    nuxt.hook('builder:watch', async (event, relativePath) => {
      // TODO: Path
      if (relativePath.includes('server/db/schema')) {
        console.log('Drizzle schema changed, regenerating zod schemas...')
        // TODO update logic?
      }
    })

    // Register alias to access generated schemas
    nuxt.options.alias['#schemas'] = resolver.resolve(
      nuxt.options.buildDir,
      'schemas'
    )
  },
})
