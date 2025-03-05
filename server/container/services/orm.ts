import { DefaultLogger, LogContext, LoggerNamespace, MikroORM } from '@mikro-orm/core'
import { MySqlDriver } from '@mikro-orm/mysql'

export class OrmService {
  private configService: IConfigService
  private orm: MikroORM<MySqlDriver>

  constructor(opts: IContainerRegisters) {
    this.configService = opts.configService
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
        SysOnlineEntity,
      ],
      loggerFactory: options => new CustomLogger(options),
      ...ormConfig,
    })

    logger.debug('MikroORM 服务初始化完成')

    // 需要刷新数据库结构时解开注释
    // await this.refresh()
  }

  private async dispose() {
    await this.orm.close(true)

    logger.debug('MikroORM 服务已销毁')
  }

  private async refresh() {
    const generator = this.orm.schema

    await generator.refreshDatabase()
  }

  get em() {
    return this.orm.em
  }
}

export type IOrmService = InstanceType<typeof OrmService>

class CustomLogger extends DefaultLogger {
  log(namespace: LoggerNamespace, message: string, context?: LogContext) {
    logger.debug(`[${namespace}] ${message}`, context)
  }
}
