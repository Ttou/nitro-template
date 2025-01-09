import KeyvRedis from '@keyv/redis'
import { createCache } from 'cache-manager'
import Keyv from 'keyv'

export class CacheService {
  private configService: InstanceType<typeof ConfigService>
  private loggerService: InstanceType<typeof LoggerService>
  private cache: ReturnType<typeof createCache>
  private stores: Map<string, any>

  constructor({ configService, loggerService }: ContainerRegisters) {
    this.configService = configService
    this.loggerService = loggerService
    this.stores = new Map()
  }

  private async init() {
    const { storeUrl, ...rest } = this.configService.get('cache')

    this.stores.set(
      'redis',
      new Keyv({
        namespace: 'nitro_template',
        useKeyPrefix: false,
        store: new KeyvRedis({ url: storeUrl }, { keyPrefixSeparator: ':' }),
      })
    )

    this.cache = createCache({
      stores: Object.values(this.stores),
      ...rest,
    })

    this.loggerService.debug('缓存服务初始化完成')
  }

  getStore<T>(key: string): T {
    return this.stores.get(key)
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
