import { FilterQuery } from '@mikro-orm/core'

export class UserModel {
  private static get em() {
    return OrmUtil.em.fork()
  }

  static async findById(id: number) {
    return await this.em.findOne<UserEntityType>(UserEntityName, { id })
  }

  static async findByUsername(username: string) {
    return await this.em.findOne<UserEntityType>(UserEntityName, { username })
  }

  static async findPage(dto: FindUserPageDtoType) {
    const { page, size, ...rest } = dto
    const filterQuery: FilterQuery<UserEntityType>[] = []

    if (rest.username) {
      filterQuery.push({ username: { $like: `%${rest.username}%` } })
    }
    if (rest.nickname) {
      filterQuery.push({ nickname: { $like: `%${rest.nickname}%` } })
    }

    return await this.em.findAndCount<UserEntityType>(UserEntityName, { $and: filterQuery }, { limit: size, offset: page - 1 })
  }
}
