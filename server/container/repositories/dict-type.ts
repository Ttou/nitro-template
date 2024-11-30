import { wrap } from '@mikro-orm/core'

export class DictTypeRepository {
  private ormService: InstanceType<typeof OrmService>

  constructor({ ormService }: ContainerRegisters) {
    this.ormService = ormService
  }

  private get em() {
    return this.ormService.em.fork()
  }

  async findPage(dto: FindDictTypePageDtoType) {
    const { page, pageSize, ...rest } = dto

    const [data, total] = await this.em.findAndCount<SysDictTypeEntityType>(SysDictTypeEntityName,
      {
        $and: [
          { dictName: rest.dictName ? { $like: `%${rest.dictName}%` } : {} },
          { dictType: rest.dictType ? { $like: `%${rest.dictType}%` } : {} },
          { isAvailable: rest.isAvailable ? { $eq: rest.isAvailable } : {} },
          { createdAt: rest.beginTime ? { $gte: rest.beginTime, $lte: rest.endTime } : {} },
        ],
      },
      { limit: pageSize, offset: page - 1 },
    )

    return { page, pageSize, data, total }
  }

  async create(dto: CreateDictTypeDtoType) {
    const existing = await this.em.findOne<SysDictTypeEntityType>(SysDictTypeEntityName,
      {
        dictType: { $eq: dto.dictType },
      },
    )

    if (existing) {
      throw badRequest(`字典类型 ${dto.dictType} 已存在`)
    }

    const config = this.em.create<SysDictTypeEntityType>(SysDictTypeEntityName, dto)

    await this.em.persist(config).flush()
  }

  async update(dto: UpdateDictTypeDtoType) {
    const { id, dictType, ...rest } = dto

    const existing = await this.em.findOne<SysDictTypeEntityType>(SysDictTypeEntityName,
      {
        $and: [
          { id: { $eq: id } },
          { dictType: { $eq: dictType } },
        ],
      },
    )

    if (!existing) {
      throw badRequest(`字典类型 ${dto.dictType} 不存在`)
    }

    wrap(existing).assign(rest)

    await this.em.persist(existing).flush()
  }

  async remove(dto: RemoveDtoType) {
    const configs = await this.em.find<SysDictTypeEntityType>(SysDictTypeEntityName,
      {
        id: { $in: dto.ids },
      },
    )

    await this.em.remove(configs).flush()
  }
}
