import { MikroORM } from '@mikro-orm/core'
import { MySqlDriver } from '@mikro-orm/mysql'

function createUseOrm() {
  let orm: MikroORM<MySqlDriver>

  const init = async () => {
    const config = await useConfig()

    // @ts-ignore
    orm = await MikroORM.init({
      driver: MySqlDriver,
      entities: [UserEntity],
      ...config.orm,
    })
  }

  return async function () {
    if (!orm) {
      await init()
    }

    return orm
  }
}

export const useOrm = createUseOrm()
