import KeyvRedis from '@keyv/redis'
import { createCache } from 'cache-manager'
import Keyv from 'keyv'

export class CacheService {
  private configService: InstanceType<typeof ConfigService>
  private loggerService: InstanceType<typeof LoggerService>
  private cache: ReturnType<typeof createCache>

  constructor({ configService, loggerService }: ContainerRegisters) {
    this.configService = configService
    this.loggerService = loggerService
  }

  private async init() {
    const { storeUrl, ...rest } = this.configService.get('cache')

    this.cache = createCache({
      stores: [
        new Keyv({
          namespace: 'nitro_template',
          useKeyPrefix: false,
          store: new KeyvRedis({ url: storeUrl }, { keyPrefixSeparator: ':' }),
        }),
      ],
      ...rest,
    })

    this.loggerService.debug('缓存服务初始化完成')
  }

  get get() {
    return this.cache.get
  }

  get set() {
    return this.cache.set
  }

  get del() {
    return this.cache.del
  }

  get mget() {
    return this.cache.mget
  }

  get mset() {
    return this.cache.mset
  }

  get mdel() {
    return this.cache.mdel
  }
}
