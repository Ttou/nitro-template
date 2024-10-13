import { drizzle, MySql2Database } from "drizzle-orm/mysql2"
import mysql from "mysql2/promise"
import * as schema from '~/db/schema'

let db: MySql2Database<typeof schema>

export async function initDrizzle() {
    const connection = await mysql.createConnection({
        host: "host",
        user: "user",
        database: "database",
    });

    db = drizzle(connection, { schema, mode: 'default' });
}

export { db }