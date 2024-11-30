import { wrap } from '@mikro-orm/core'

export class ConfigRepository {
  private ormService: InstanceType<typeof OrmService>

  constructor({ ormService }: ContainerRegisters) {
    this.ormService = ormService
  }

  private get em() {
    return this.ormService.em.fork()
  }

  async findPage(dto: FindConfigPageDtoType) {
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

  async findByKey(dto: FindConfigByKeyDtoType) {
    const existing = await this.em.findOne<SysConfigEntityType>(SysConfigEntityName,
      {
        configKey: { $eq: dto.configKey },
      },
    )

    if (!existing) {
      throw badRequest(`配置项 ${dto.configKey} 不存在`)
    }

    return existing
  }

  async create(dto: CreateConfigDtoType) {
    const existing = await this.em.findOne<SysConfigEntityType>(SysConfigEntityName,
      {
        configKey: { $eq: dto.configKey },
      },
    )

    if (existing) {
      throw badRequest(`配置项 ${dto.configKey} 已存在`)
    }

    const config = this.em.create<SysConfigEntityType>(SysConfigEntityName, dto)

    await this.em.persist(config).flush()
  }

  async update(dto: UpdateConfigDtoType) {
    const { id, configKey, ...rest } = dto

    const existing = await this.em.findOne<SysConfigEntityType>(SysConfigEntityName,
      {
        $and: [
          { id: { $eq: id } },
          { configKey: { $eq: configKey } },
        ],
      },
    )

    if (!existing) {
      throw badRequest(`配置项 ${dto.configKey} 不存在`)
    }

    wrap(existing).assign(rest)

    await this.em.persist(existing).flush()
  }

  async remove(dto: RemoveDtoType) {
    const configs = await this.em.find<SysConfigEntityType>(SysConfigEntityName,
      {
        id: { $in: dto.ids },
        isBuiltin: { $eq: YesOrNo.NO },
      },
    )

    await this.em.remove(configs).flush()
  }
}
