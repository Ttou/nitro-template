import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { parseYAML } from 'confbox'
import { get, isEmpty } from 'es-toolkit/compat'

export const configService = defineService({
  name: Symbol('CONFIG_SERVICE'),
  priority: 1,
  async init() {
    const configPath = join(process.cwd(), `config/${process.env.APP_ENV ?? 'dev'}.yaml`)
    const configFile = readFileSync(configPath, { encoding: 'utf-8' })
    const config = parseYAML(configFile)

    if (isEmpty(config)) {
      throw internalServerError('配置文件加载失败')
    }

    this.expose.config = config

    logger.debug('配置服务初始化完成')
  },
  expose: {
    config: {} as Record<string, any>,
    get<T>(key: string): T {
      const result = get(this.config, key)

      if (result === undefined) {
        throw internalServerError(`配置键名不存在: ${key}`)
      }

      return result
    },
  },
})
