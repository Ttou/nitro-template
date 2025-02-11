import Redis from 'ioredis'

export class RedisService {
  private configService: IConfigService
  private loggerService: ILoggerService

  public client: Redis

  constructor(opts: IContainerRegisters) {
    this.configService = opts.configService
    this.loggerService = opts.loggerService
  }

  private async init() {
    const config = this.configService.get('redis')

    this.client = new Redis(config)

    this.client.on('connect', () => {
      this.loggerService.debug('Redis successfully connected')
    })

    this.loggerService.debug('Redis 服务初始化完成')
  }

  private async dispose() {
    this.client.disconnect()

    this.loggerService.debug('Redis 服务已销毁')
  }
}

export type IRedisService = InstanceType<typeof RedisService>