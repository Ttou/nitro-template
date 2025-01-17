import { loadConfig } from 'c12'
import { get } from 'es-toolkit/compat'

export class ConfigService {
  private loggerService: InstanceType<typeof LoggerService>
  private config: Record<string, any>

  constructor(opts: ContainerRegisters) {
    this.loggerService = opts.loggerService
  }

  async init() {
    const { config: _config } = await loadConfig({
      cwd: process.cwd(),
      configFile: this.getConfigFile(),
    })

    this.config = _config

    this.loggerService.debug('配置服务初始化完成')
  }

  private getConfigFile() {
    return ['./config', process.env.APP_ENV ?? 'dev', 'yaml'].join('.')
  }

  /**
   * 获取配置
   * @param key
   * @returns
   */
  get(key: string) {
    const config = get(this.config, key)

    if (config === undefined) {
      throw internalServerError(`配置键名不存在: ${key}`)
    }

    return config
  }
}
