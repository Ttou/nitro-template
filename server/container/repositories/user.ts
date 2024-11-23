import { FilterQuery } from '@mikro-orm/core'

export class UserRepository {
  private ormService: InstanceType<typeof OrmService>

  constructor({ ormService }: ContainerRegisters) {
    this.ormService = ormService
  }

  private get em() {
    return this.ormService.em.fork()
  }

  /**
   * 依据 id 查找
   * @param id
   * @returns
   */
  async findById(id: number) {
    return await this.em.findOne<UserEntityType>(UserEntityName, { id })
  }

  /**
   * 依据用户名查找
   * @param username
   * @returns
   */
  async findByUsername(username: string) {
    return await this.em.findOne<UserEntityType>(UserEntityName, { username })
  }

  /**
   * 分页
   * @param dto
   * @returns
   */
  async findPage(dto: FindUserPageDtoType) {
    const { page, pageSize, ...rest } = dto
    const filterQuery: FilterQuery<UserEntityType>[] = []

    if (rest.username) {
      filterQuery.push({ username: { $like: `%${rest.username}%` } })
    }
    if (rest.nickname) {
      filterQuery.push({ nickname: { $like: `%${rest.nickname}%` } })
    }

    const result = await this.em.findAndCount<UserEntityType>(UserEntityName, { $and: filterQuery }, { limit: pageSize, offset: page - 1 })
    return transformPageResult(dto, result)
  }
}
