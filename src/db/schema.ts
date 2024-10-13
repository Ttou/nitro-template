import { bigint, mysqlTable } from 'drizzle-orm/mysql-core'

export const sysConfig = mysqlTable('sys_config', {
  id: bigint({ mode: 'number' }).autoincrement().notNull(),
})
