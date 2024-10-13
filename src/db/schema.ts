import { mysqlTable, int } from "drizzle-orm/mysql-core"

export const user = mysqlTable('user', {
  id: int()
})

export const role = mysqlTable('role', {
    id: int()
})