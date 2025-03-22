import KeyvRedis from '@keyv/redis'
import { createCache } from 'cache-manager'
import Keyv from 'keyv'

export const cacheService = defineService({
  name: Symbol('CACHE_SERVICE'),
  priority: 5,
  async init() {
    const { storeUrl, ...rest } = configService.get('cache')

    this.expose.cache = createCache({
      stores: [
        new Keyv({
          namespace: 'nitro_template',
          useKeyPrefix: false,
          store: new KeyvRedis({ url: storeUrl }, { keyPrefixSeparator: ':' }),
        }),
      ],
      ...rest,
    })

    logger.debug('缓存服务初始化完成')
  },
  expose: {
    cache: {} as ReturnType<typeof createCache>,
    get get() {
      return this.cache.get
    },
    get set() {
      return this.cache.set
    },
    get del() {
      return this.cache.del
    },
  },
})
