import { DefaultLogger, LogContext, LoggerNamespace, MikroORM } from '@mikro-orm/core'
import { MySqlDriver } from '@mikro-orm/mysql'

class CustomLogger extends DefaultLogger {
  log(namespace: LoggerNamespace, message: string, context?: LogContext) {
    logger.debug(`[${namespace}] ${message}`, context)
  }
}

export const ormService = defineService({
  name: Symbol('ORM_SERVICE'),
  priority: 10,
  async init() {
    const ormConfig = configService.get('orm')

    this.expose.orm = await MikroORM.init({
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
  },
  async depose() {
    await this.expose.orm.close(true)

    logger.debug('MikroORM 服务已销毁')
  },
  async refresh() {
    const generator = this.expose.orm.schema

    await generator.refreshDatabase()
  },
  expose: {
    orm: {} as MikroORM<MySqlDriver>,
    get em() {
      return this.orm.em
    },
  },
})
