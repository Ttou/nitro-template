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
  async findByUsername(userName: string) {
    return await this.em.findOne<UserEntityType>(UserEntityName, { userName })
  }

  /**
   * 分页
   * @param dto
   * @returns
   */
  async findPage(dto: FindUserPageDtoType) {
    const { page, pageSize, ...rest } = dto
    const filterQuery: FilterQuery<UserEntityType>[] = []

    if (rest.userName) {
      filterQuery.push({ userName: { $like: `%${rest.userName}%` } })
    }
    if (rest.nickName) {
      filterQuery.push({ userName: { $like: `%${rest.userName}%` } })
    }

    const result = await this.em.findAndCount<UserEntityType>(UserEntityName, { $and: filterQuery }, { limit: pageSize, offset: page - 1 })
    return transformPageResult(dto, result)
  }
}
