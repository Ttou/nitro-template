import { defineConfig } from '@mikro-orm/core'
import { MySqlDriver } from '@mikro-orm/mysql'

import config from './c12.config.js'

export default defineConfig({
  driver: MySqlDriver,
  entities: ['./server/container/entities/*.ts'],
  ...config.orm,
})
