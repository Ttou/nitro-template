import { run } from './util.js'

export async function create() {
  await run('npx mikro-orm-esm schema:create --run', '.')
}

export async function drop() {
  await run('npx mikro-orm-esm schema:drop --run', '.')
}

export async function generate() {
  await run('npx mikro-orm-esm schema:generate --run', '.')
}

export async function fresh() {
  await run('npx mikro-orm-esm schema:fresh --run', '.')
}
