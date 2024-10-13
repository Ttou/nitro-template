import { drizzle, MySql2Database } from 'drizzle-orm/mysql2'
import mysql, { ConnectionOptions } from 'mysql2/promise'

import * as schema from '~/db/schema'

function createUseDatabase() {
  let db: MySql2Database<typeof schema>

  return async function () {
    if (!db) {
      const connection = await mysql.createConnection(getDatabaseConfig())

      db = drizzle(connection, { schema, mode: 'default' })
    }
    return db
  }
}

export const useDatabase = createUseDatabase()

export function getDatabaseConfig(): ConnectionOptions {
  return {
    host: process.env.NITRO_DB_HOST,
    port: Number(process.env.NITRO_DB_PORT),
    database: process.env.NITRO_DB_DATABASE,
    user: process.env.NITRO_DB_USER,
    password: process.env.NITRO_DB_PASSWORD,
  }
}
