import { loadConfig } from 'c12'

const getConfigFile = () => {
  return ['./config/config', process.env.APP_ENV ?? 'dev', 'yaml'].join('.')
}

const { config } = await loadConfig({
  cwd: process.cwd(),
  configFile: getConfigFile(),
})

export default config
