import { createConsola } from 'consola'

const TAG = 'nuxt-drizzle-zod-gen'

const _logger = createConsola({ level: -999 }).withTag(TAG)

export const logger = Object.assign(_logger, {
  enable: () => {
    _logger.level = 4
  },
  disable: () => {
    _logger.level = -999
  },
})
