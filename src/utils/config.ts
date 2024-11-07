import { loadConfig } from 'c12'

function createUseConfig() {
  let config: ConfigType

  const setup = async () => {
    const { NODE_ENV } = process.env
    const { config: _config } = await loadConfig({
      cwd: process.cwd(),
      configFile: `./config/config.${NODE_ENV}.yaml`,
    })
    // @ts-ignore
    config = _config
  }

  return async function () {
    if (!config) {
      await setup()
    }
    return config
  }
}

export const useConfig = createUseConfig()
