import { wrap } from '@mikro-orm/core'

export class RoleRepository {
  private ormService: InstanceType<typeof OrmService>

  constructor({ ormService }: ContainerRegisters) {
    this.ormService = ormService
  }

  private get em() {
    return this.ormService.em.fork()
  }

  async findPage(dto: FindRolePageDtoType) {
    const { page, pageSize, ...rest } = dto

    const [data, total] = await this.em.findAndCount<SysRoleEntityType>(SysRoleEntityName,
      {
        $and: [
          { roleName: rest.roleName ? { $like: `%${rest.roleName}%` } : {} },
          { roleKey: rest.roleKey ? { $like: `%${rest.roleKey}%` } : {} },
          { isAvailable: rest.isAvailable ? { $eq: rest.isAvailable } : {} },
          { createdAt: rest.beginTime ? { $gte: rest.beginTime, $lte: rest.endTime } : {} },
        ],
      },
      { limit: pageSize, offset: page - 1 },
    )

    return { page, pageSize, data, total }
  }

  async create(dto: CreateRoleDtoType) {
    const { roleKey } = dto

    const existing = await this.em.findOne<SysRoleEntityType>(SysRoleEntityName,
      {
        roleKey: { $eq: roleKey },
      },
    )

    if (existing) {
      throw badRequest(`角色标识 ${roleKey} 已存在`)
    }

    const config = this.em.create<SysRoleEntityType>(SysRoleEntityName, dto)

    await this.em.persist(config).flush()
  }

  async update(dto: UpdateRoleDtoType) {
    const { id, roleKey, ...rest } = dto

    const existing = await this.em.findOne<SysRoleEntityType>(SysRoleEntityName,
      {
        $and: [
          { id: { $eq: id } },
          { roleKey: { $eq: roleKey } },
        ],
      },
    )

    if (!existing) {
      throw badRequest(`角色标识 ${roleKey} 不存在`)
    }

    wrap(existing).assign(rest)

    await this.em.persist(existing).flush()
  }

  async remove(dto: RemoveDtoType) {
    const { ids } = dto

    const oldRecords = await this.em.find<SysRoleEntityType>(SysRoleEntityName,
      {
        id: { $in: ids },
      },
    )

    await this.em.remove(oldRecords).flush()
  }

  async findAllocatedPage(dto: FindAllocatedPageDtoType) {
    const { page, pageSize, ...rest } = dto

    const [data, total] = await this.em.findAndCount<SysUserEntityType>(SysUserEntityName,
      {
        $and: [
          { userName: rest.userName ? { $like: `%${rest.userName}%` } : {} },
          { nickName: rest.nickName ? { $like: `%${rest.nickName}%` } : {} },
          { roles: { id: { $eq: rest.id } } },
        ],
      },
      { limit: pageSize, offset: page - 1 },
    )

    return { page, pageSize, data, total }
  }
}
