import Redis from 'ioredis'

export class RedisService {
  private configService: IConfigService

  public client: Redis

  constructor(opts: IContainerRegisters) {
    this.configService = opts.configService
  }

  private async init() {
    const config = this.configService.get('redis')

    this.client = new Redis(config)

    this.client.on('connect', () => {
      logger.debug('Redis 服务已连接')
    })

    logger.debug('Redis 服务初始化完成')
  }

  private async dispose() {
    this.client.disconnect()

    logger.debug('Redis 服务已销毁')
  }
}

export type IRedisService = InstanceType<typeof RedisService>
