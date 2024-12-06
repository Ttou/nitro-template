import { wrap } from '@mikro-orm/core'

export class SysMenuRepository {
  private ormService: InstanceType<typeof OrmService>

  constructor({ ormService }: ContainerRegisters) {
    this.ormService = ormService
  }

  private get em() {
    return this.ormService.em.fork()
  }

  async findList(dto: FindSysMenuListDtoType) {
    const { menuName, menuKey, isAvailable } = dto

    const data = await this.em.findAll<SysMenuEntityType>(SysMenuEntityName,
      {
        where: {
          menuName: menuName ? { $like: `%${menuName}%` } : {},
          menuKey: menuKey ? { $like: `%${menuKey}%` } : {},
          isAvailable: isAvailable ? { $eq: isAvailable } : {},
        },
      },
    )

    return data
  }

  async create(dto: CreateSysMenuDtoType) {
    const { menuKey } = dto

    const oldRecord = await this.em.findOne<SysMenuEntityType>(SysMenuEntityName,
      {
        menuKey: { $eq: menuKey },
      },
    )

    if (oldRecord) {
      throw badRequest(`菜单标识 ${menuKey} 已存在`)
    }

    const newRecord = this.em.create<SysMenuEntityType>(SysMenuEntityName, dto)

    await this.em.persist(newRecord).flush()
  }

  async update(dto: UpdateSysMenuDtoType) {
    const { id, menuKey, ...rest } = dto

    const oldRecord = await this.em.findOne<SysMenuEntityType>(SysMenuEntityName,
      {
        $and: [
          { id: { $eq: id } },
          { menuKey: { $eq: menuKey } },
        ],
      },
    )

    if (!oldRecord) {
      throw badRequest(`菜单标识 ${menuKey} 不存在`)
    }

    wrap(oldRecord).assign(rest)

    await this.em.persist(oldRecord).flush()
  }

  async remove(dto: RemoveDtoType) {
    const { ids } = dto

    const oldRecords = await this.em.find<SysMenuEntityType>(SysMenuEntityName,
      {
        id: { $in: ids },
      },
    )

    await this.em.remove(oldRecords).flush()
  }
}
