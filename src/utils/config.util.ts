import { loadConfig } from 'c12'

export class ConfigUtil {
  static config: ConfigType

  static async init() {
    const { config: _config } = await loadConfig({
      cwd: process.cwd(),
      configFile: this.getConfigFile(),
    })
    // @ts-ignore
    this.config = _config
  }

  private static getConfigFile() {
    return ['./config/config', process.env.APP_ENV ?? 'dev', 'yaml'].join('.')
  }
}
