import { loadDotenv } from 'c12'
import { defineConfig } from 'drizzle-kit'

const env = await loadDotenv({ cwd: process.cwd(), fileName: '.env' })

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'mysql',
  dbCredentials: {
    host: env.NITRO_DB_HOST,
    port: Number(env.NITRO_DB_PORT),
    database: env.NITRO_DB_DATABASE,
    user: env.NITRO_DB_USER,
    password: env.NITRO_DB_PASSWORD,
  },
})
