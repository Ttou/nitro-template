import { loadConfig } from 'c12';

const { NODE_ENV } = process.env

const { config } = await loadConfig({
  configFile: `./.config/config.${NODE_ENV}.js`
})

export default config