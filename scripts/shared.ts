import { run } from './util.js'

export async function lint() {
  await run('npx eslint \"shared/**/*.ts\" --fix', '.')
}