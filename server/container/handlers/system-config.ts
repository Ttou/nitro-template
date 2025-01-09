import { wrap } from '@mikro-orm/core'

export class SystemConfigHandler {
  private ormService: InstanceType<typeof OrmService>

  constructor({ ormService }: ContainerRegisters) {
    this.ormService = ormService
  }

  private get em() {
    return this.ormService.em.fork()
  }

  async findPage(dto: FindSystemConfigPageDtoType) {
    const { page, pageSize, ...rest } = dto

    const [data, total] = await this.em.findAndCount<SysConfigEntityType>(SysConfigEntityName,
      {
        $and: [
          { configName: rest.configName ? { $like: `%${rest.configName}%` } : {} },
          { configKey: rest.configKey ? { $like: `%${rest.configKey}%` } : {} },
          { isBuiltin: rest.isBuiltin ? { $eq: rest.isBuiltin } : {} },
          { createdAt: rest.beginTime ? { $gte: rest.beginTime, $lte: rest.endTime } : {} },
        ],
      },
      { limit: pageSize, offset: page - 1 },
    )

    return { page, pageSize, data, total }
  }

  async findByKey(dto: FindSystemConfigByKeyDtoType) {
    const { configKey } = dto

    const oldRecord = await this.em.findOne<SysConfigEntityType>(SysConfigEntityName,
      {
        configKey: { $eq: configKey },
      },
    )

    if (!oldRecord) {
      throw badRequest(`配置标识 ${configKey} 不存在`)
    }

    return oldRecord
  }

  async create(dto: CreateSystemConfigDtoType) {
    const { configKey } = dto

    const oldRecord = await this.em.findOne<SysConfigEntityType>(SysConfigEntityName,
      {
        configKey: { $eq: configKey },
      },
    )

    if (oldRecord) {
      throw badRequest(`配置标识 ${configKey} 已存在`)
    }

    const config = this.em.create<SysConfigEntityType>(SysConfigEntityName, dto)

    await this.em.persist(config).flush()
  }

  async update(dto: UpdateSystemConfigDtoType) {
    const { id, configKey, ...rest } = dto

    const oldRecord = await this.em.findOne<SysConfigEntityType>(SysConfigEntityName,
      {
        $and: [
          { id: { $eq: id } },
          { configKey: { $eq: configKey } },
        ],
      },
    )

    if (!oldRecord) {
      throw badRequest(`配置标识 ${configKey} 不存在`)
    }

    wrap(oldRecord).assign(rest)

    await this.em.persist(oldRecord).flush()
  }

  async remove(dto: RemoveDtoType) {
    const { ids } = dto

    const oldRecords = await this.em.find<SysConfigEntityType>(SysConfigEntityName,
      {
        id: { $in: ids },
        isBuiltin: { $eq: YesOrNo.enum.NO },
      },
    )

    await this.em.remove(oldRecords).flush()
  }
}
