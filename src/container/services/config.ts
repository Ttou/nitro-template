import { loadConfig } from 'c12'
import { get } from 'lodash-unified'

export class ConfigService {
  private config: any

  async init() {
    const { config: _config } = await loadConfig({
      cwd: process.cwd(),
      configFile: this.getConfigFile(),
    })

    this.config = _config

    console.log('Config initialized')
  }

  private getConfigFile() {
    return ['./config/config', process.env.APP_ENV ?? 'dev', 'yaml'].join('.')
  }

  /**
   * 获取配置
   * @param key
   * @returns
   */
  get(key: string) {
    const config = get(this.config, key)

    if (config === undefined) {
      throw internalServerError(`Config not found: ${key}`)
    }

    return config
  }
}
