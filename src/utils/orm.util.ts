import { FilterQuery, MikroORM } from '@mikro-orm/core'
import { MySqlDriver } from '@mikro-orm/mysql'

export class OrmUtil {
  static orm: MikroORM<MySqlDriver>

  static get em() {
    return this.orm.em
  }

  static async init() {
    const { orm } = ConfigUtil.config

    // @ts-ignore
    this.orm = await MikroORM.init({
      driver: MySqlDriver,
      entities: [UserEntity],
      ...orm,
    })
  }
}
