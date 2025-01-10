import { MikroORM } from '@mikro-orm/core'
import { MySqlDriver } from '@mikro-orm/mysql'

export class OrmService {
  private configService: InstanceType<typeof ConfigService>
  private loggerService: InstanceType<typeof LoggerService>
  private orm: MikroORM<MySqlDriver>

  constructor(opt: ContainerRegisters) {
    this.configService = opt.configService
    this.loggerService = opt.loggerService
  }

  private async init() {
    const ormConfig = this.configService.get('orm')

    this.orm = await MikroORM.init({
      driver: MySqlDriver,
      entities: [
        SysConfigEntity,
        SysDeptEntity,
        SysDictDataEntity,
        SysDictTypeEntity,
        SysMenuEntity,
        SysPostEntity,
        SysRoleEntity,
        SysUserEntity,
      ],
      logger: msg => this.loggerService.debug(msg),
      ...ormConfig,
    })

    this.loggerService.debug('数据库服务初始化完成')

    // 需要刷新数据库结构时解开注释
    // await this.refresh()
  }

  private async dispose() {
    await this.orm.close(true)

    this.loggerService.debug('数据库服务已销毁')
  }

  private async refresh() {
    const generator = this.orm.schema

    await generator.refreshDatabase()
  }

  get em() {
    return this.orm.em
  }
}
