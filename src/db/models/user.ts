import { MikroORM } from '@mikro-orm/core'
import { MySqlDriver } from '@mikro-orm/mysql'

function createUserModel() {
  let em: MikroORM<MySqlDriver>['em']

  const findById = async (id: number) => {
    return await em.findOne<UserEntityType>(UserEntityName, { id })
  }

  const findByUsername = async (username: string) => {
    return await em.findOne<UserEntityType>(UserEntityName, { username })
  }

  return async function () {
    if (!em) {
      const orm = await useOrm()
      em = orm.em.fork()
    }

    return {
      findById,
      findByUsername,
    }
  }
}

export const useUserModel = createUserModel()
