import { join } from 'node:path'

import { loadConfig } from 'c12'
import { get, isEmpty } from 'es-toolkit/compat'

export class ConfigService {
  private loggerService: ILoggerService
  private config: Record<string, any>

  constructor(opts: IContainerRegisters) {
    this.loggerService = opts.loggerService
  }

  private async init() {
    const { config } = await loadConfig({
      cwd: join(process.cwd(), 'config'),
      configFile: ['./config', process.env.APP_ENV ?? 'dev', 'yaml'].join('.'),
    })

    if (isEmpty(config)) {
      throw internalServerError('配置文件加载失败')
    }

    this.config = config

    this.loggerService.debug('配置服务初始化完成')
  }

  /**
   * 获取配置
   * @param key
   */
  get(key: string) {
    const result = get(this.config, key)

    if (result === undefined) {
      throw internalServerError(`配置键名不存在: ${key}`)
    }

    return result
  }
}

export type IConfigService = InstanceType<typeof ConfigService>
