import KeyvRedis from '@keyv/redis'
import { createCache } from 'cache-manager'
import Keyv from 'keyv'

export class CacheService {
  private configService: IConfigService
  private cache: ReturnType<typeof createCache>

  constructor(opts: IRegisterOptions) {
    this.configService = opts.configService
  }

  private async init() {
    const { storeUrl, ...rest } = this.configService.get<any>('cache')

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

    logger.debug('缓存服务初始化完成')
  }

  private async dispose() {
    await this.cache.disconnect()
  }

  public get get() {
    return this.cache.get
  }

  public get set() {
    return this.cache.set
  }

  public get del() {
    return this.cache.del
  }
}

export type ICacheService = InstanceType<typeof CacheService>
