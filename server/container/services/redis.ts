import Redis from 'ioredis'

export class RedisService {
  private configService: InstanceType<typeof ConfigService>
  private loggerService: InstanceType<typeof LoggerService>

  public client: Redis

  constructor(opts: ContainerRegisters) {
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
