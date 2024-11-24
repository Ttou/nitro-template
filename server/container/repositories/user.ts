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
    return await this.em.findOne<SysUserEntityType>(SysUserEntityName, { id })
  }

  /**
   * 依据用户名查找
   * @param username
   * @returns
   */
  async findByUsername(userName: string) {
    return await this.em.findOne<SysUserEntityType>(SysUserEntityName, { userName })
  }

  /**
   * 分页
   * @param dto
   * @returns
   */
  async findPage(dto: FindUserPageDtoType) {
    const { page, pageSize, ...rest } = dto
    const filterQuery: FilterQuery<SysUserEntityType>[] = []

    if (rest.userName) {
      filterQuery.push({ userName: { $like: `%${rest.userName}%` } })
    }
    if (rest.nickName) {
      filterQuery.push({ userName: { $like: `%${rest.userName}%` } })
    }

    const [data, total] = await this.em.findAndCount<SysUserEntityType>(SysUserEntityName, { $and: filterQuery }, { limit: pageSize, offset: page - 1 })

    return {
      page,
      pageSize,
      data,
      total,
    }
  }
}
