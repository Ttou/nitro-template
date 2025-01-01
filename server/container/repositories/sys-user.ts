import { wrap } from '@mikro-orm/core'

export class SysUserRepository {
  private hashService: InstanceType<typeof HashService>
  private ormService: InstanceType<typeof OrmService>

  constructor({ hashService, ormService }: ContainerRegisters) {
    this.hashService = hashService
    this.ormService = ormService
  }

  private get em() {
    return this.ormService.em.fork()
  }

  async findById(id: bigint) {
    return await this.em.findOne<SysUserEntityType>(SysUserEntityName, { id })
  }

  async findByUsername(userName: string) {
    return await this.em.findOne<SysUserEntityType>(SysUserEntityName, { userName })
  }

  /**
   * 分页
   * @param dto
   * @returns
   */
  async findPage(dto: FindSysUserPageDtoType) {
    const { page, pageSize, ...rest } = dto

    const [data, total] = await this.em.findAndCount<SysUserEntityType>(SysUserEntityName,
      {
        $and: [
          { userName: rest.userName ? { $like: `%${rest.userName}%` } : {} },
          { nickName: rest.nickName ? { $like: `%${rest.nickName}%` } : {} },
        ],
      },
      { limit: pageSize, offset: page - 1 },
    )

    return { page, pageSize, data, total }
  }

  async create(dto: CreateSysUserDtoType) {
    const { userName, email } = dto

    const oldRecord = await this.em.findOne<SysUserEntityType>(SysUserEntityName, {
      $or: [
        { userName: { $eq: userName } },
        { email: { $eq: email } },
      ],
    })

    if (oldRecord) {
      throw badRequest(`用户名或邮箱已存在`)
    }

    const password = await this.hashService.hash(dto.password)
    const newRecord = this.em.create<SysUserEntityType>(SysUserEntityName, { ...dto, isDelete: YesOrNo.enum.NO, password })
    await this.em.persist(newRecord).flush()
  }

  async update(dto: UpdateSysUserDtoType) {
    const { id, userName, ...rest } = dto

    const oldRecord = await this.em.findOne<SysUserEntityType>(SysUserEntityName, {
      $and: [
        { id: { $eq: id } },
        { userName: { $eq: userName } },
      ],
    })

    if (!oldRecord) {
      throw badRequest('用户不存在')
    }

    wrap(oldRecord).assign(rest)

    await this.em.persist(oldRecord).flush()
  }

  async remove(dto: RemoveDtoType) {
    const { ids } = dto

    const oldRecords = await this.em.find<SysUserEntityType>(SysUserEntityName,
      {
        id: { $in: ids },
      },
    )

    await this.em.remove(oldRecords).flush()
  }
}
