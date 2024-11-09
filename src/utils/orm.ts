import { MikroORM } from '@mikro-orm/core'
import { MySqlDriver } from '@mikro-orm/mysql'

export class ORM {
  static orm: MikroORM<MySqlDriver>

  static async init() {
    const { orm } = Config.config

    // @ts-ignore
    this.orm = await MikroORM.init({
      driver: MySqlDriver,
      entities: [UserEntity],
      ...orm,
    })
  }
}
