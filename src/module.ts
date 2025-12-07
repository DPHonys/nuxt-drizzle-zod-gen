import {
  defineNuxtModule,
  createResolver,
  addTemplate,
  logger,
} from '@nuxt/kit'
import { defu } from 'defu'
import { watch } from 'chokidar'
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
      logger.error(
        'Drizzle schema path is not defined. Please provide it in the module options or ensure it is specified in drizzle.config.'
      )
      return
    } else {
      const schemaPath = options.schemaPath
      const absoluteSchemaPath = resolver.resolve(projectRoot, schemaPath)
      logger.info(`Found Drizzle schema at: ${absoluteSchemaPath}`)

      // Add template to generate Zod schemas
      addTemplate({
        filename: 'drizzle-zod-gen.ts',
        write: true,
        async getContents(_data) {
          return Promise.resolve('')
        },
      })

      // Watch for changes in the Drizzle schema files
      if (nuxt.options.dev) {
        const watcher = watch(absoluteSchemaPath, {
          ignoreInitial: true,
        })

        watcher.on('change', async (path) => {
          logger.info(`Drizzle schema changed: ${path}`)
          logger.info('Regenerating zod schemas...')
          // TODO: Implement schema regeneration logic
        })

        nuxt.hook('close', () => {
          watcher.close()
        })
      }

      // Register alias to access generated schemas
      nuxt.options.alias['#schemas'] = resolver.resolve(
        nuxt.options.buildDir,
        'schemas'
      )
    }
  },
})
