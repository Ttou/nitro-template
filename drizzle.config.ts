import 'dotenv/config'

import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'mysql',
  dbCredentials: {
    host: process.env.NITRO_DB_HOST,
    port: Number(process.env.NITRO_DB_PORT),
    database: process.env.NITRO_DB_DATABASE,
    user: process.env.NITRO_DB_USER,
    password: process.env.NITRO_DB_PASSWORD,
  },
})
