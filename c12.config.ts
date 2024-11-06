import { loadConfig } from 'c12'

const { NODE_ENV } = process.env

const { config } = await loadConfig({
  cwd: process.cwd(),
  configFile: `./config/config.${NODE_ENV}.yaml`,
})

export default config
