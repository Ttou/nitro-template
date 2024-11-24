import { run } from './util.js'

export async function prepare() {
  await run('npx nitro prepare', '.')
}

export async function dev() {
  await run('npx cross-env APP_ENV=dev nitro dev', '.')
}

export async function build() {
  await run('npx cross-env APP_ENV=prod nitro build', '.')
}

export async function schemaCreate() {
  await run('npx mikro-orm-esm schema:create --run', '.')
}

export async function schemaFresh() {
  await run('npx mikro-orm-esm schema:fresh --run', '.')
}
