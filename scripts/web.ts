import { run } from './util.js'

export async function dev() {
  await run('npx vite dev', '.')
}

export async function build() {
  await run('npx vite build', '.')
}
