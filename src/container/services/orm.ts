import { MikroORM } from '@mikro-orm/core'
import { MySqlDriver } from '@mikro-orm/mysql'

export class OrmService {
  private configService: InstanceType<typeof ConfigService>
  private loggerService: InstanceType<typeof LoggerService>
  private orm: MikroORM<MySqlDriver>

  constructor({ configService, loggerService }: ContainerRegisters) {
    this.configService = configService
    this.loggerService = loggerService
  }

  private async init() {
    const ormConfig = this.configService.get('orm')

    this.orm = await MikroORM.init({
      driver: MySqlDriver,
      entities: [UserEntity],
      logger: msg => this.loggerService.debug(msg),
      ...ormConfig,
    })

    this.loggerService.debug('数据库服务初始化完成')
  }

  private async dispose() {
    await this.orm.close(true)

    this.loggerService.debug('数据库服务已销毁')
  }

  get em() {
    return this.orm.em
  }
}
