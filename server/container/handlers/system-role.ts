import { wrap } from '@mikro-orm/core'

export class SystemRoleHandler {
  private ormService: InstanceType<typeof OrmService>

  constructor({ ormService }: ContainerRegisters) {
    this.ormService = ormService
  }

  private get em() {
    return this.ormService.em.fork()
  }

  async findPage(dto: FindSystemRolePageDtoType) {
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

  async create(dto: CreateSystemRoleDtoType) {
    const { roleKey } = dto

    const oldRecord = await this.em.findOne<SysRoleEntityType>(SysRoleEntityName,
      {
        roleKey: { $eq: roleKey },
      },
    )

    if (oldRecord) {
      throw badRequest(`角色标识 ${roleKey} 已存在`)
    }

    const config = this.em.create<SysRoleEntityType>(SysRoleEntityName, dto)

    await this.em.persist(config).flush()
  }

  async update(dto: UpdateSystemRoleDtoType) {
    const { id, roleKey, ...rest } = dto

    const oldRecord = await this.em.findOne<SysRoleEntityType>(SysRoleEntityName,
      {
        $and: [
          { id: { $eq: id } },
          { roleKey: { $eq: roleKey } },
        ],
      },
    )

    if (!oldRecord) {
      throw badRequest(`角色标识 ${roleKey} 不存在`)
    }

    wrap(oldRecord).assign(rest)

    await this.em.persist(oldRecord).flush()
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

  async findAllocatedUserPage(dto: FindAllocatedUserPageDtoType) {
    const { page, pageSize, ...rest } = dto

    const [data, total] = await this.em.findAndCount<SysUserEntityType, SysUserEntityRelationKeys>(SysUserEntityName,
      {
        $and: [
          { userName: rest.userName ? { $like: `%${rest.userName}%` } : {} },
          { nickName: rest.nickName ? { $like: `%${rest.nickName}%` } : {} },
          { roles: { id: { $eq: rest.id } } },
        ],
      },
      { limit: pageSize, offset: page - 1, populate: ['roles'] },
    )

    return { page, pageSize, data, total }
  }

  async findUnallocatedUserPage(dto: FindUnallocatedUserPageDtoType) {
    const { page, pageSize, ...rest } = dto

    const allocatedUsers = await this.em.find<SysUserEntityType, SysUserEntityRelationKeys>(SysUserEntityName, {
      roles: { id: { $eq: rest.id } },
    })

    const [data, total] = await this.em.findAndCount<SysUserEntityType, SysUserEntityRelationKeys>(SysUserEntityName,
      {
        $and: [
          { id: { $nin: allocatedUsers.map(item => item.id) } },
          { userName: rest.userName ? { $like: `%${rest.userName}%` } : {} },
          { nickName: rest.nickName ? { $like: `%${rest.nickName}%` } : {} },
        ],
      },
      { limit: pageSize, offset: page - 1, populate: ['roles'] },
    )

    return { page, pageSize, data, total }
  }

  async allocateUser(dto: AllocateUserDtoType) {
    const { id, ids } = dto

    const role = await this.em.findOne<SysRoleEntityType>(SysRoleEntityName,
      {
        id: { $eq: id },
      },
    )
    const users = await this.em.find<SysUserEntityType, SysUserEntityRelationKeys>(SysUserEntityName,
      {
        id: { $in: ids },
      },
      { populate: ['roles'] },
    )

    for (const user of users) {
      user.roles.add(role)
    }

    await this.em.persist(users).flush()
  }

  async unallocateUser(dto: UnallocateUserDtoType) {
    const { id, ids } = dto

    const users = await this.em.find<SysUserEntityType, SysUserEntityRelationKeys>(SysUserEntityName,
      {
        id: { $in: ids },
      },
      { populate: ['roles'] },
    )

    for (const user of users) {
      user.roles.remove(item => item.id === id)
    }

    await this.em.persist(users).flush()
  }
}
