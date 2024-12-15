import { wrap } from '@mikro-orm/core'

export class SysDictTypeRepository {
  private ormService: InstanceType<typeof OrmService>

  constructor({ ormService }: ContainerRegisters) {
    this.ormService = ormService
  }

  private get em() {
    return this.ormService.em.fork()
  }

  async findPage(dto: FindSysDictTypePageDtoType) {
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

  async create(dto: CreateSysDictTypeDtoType) {
    const { dictType } = dto

    const oldRecord = await this.em.findOne<SysDictTypeEntityType>(SysDictTypeEntityName,
      {
        dictType: { $eq: dictType },
      },
    )

    if (oldRecord) {
      throw badRequest(`字典类型 ${dictType} 已存在`)
    }

    const config = this.em.create<SysDictTypeEntityType>(SysDictTypeEntityName, dto)

    await this.em.persist(config).flush()
  }

  async update(dto: UpdateSysDictTypeDtoType) {
    const { id, dictType, ...rest } = dto

    const oldRecord = await this.em.findOne<SysDictTypeEntityType>(SysDictTypeEntityName,
      {
        $and: [
          { id: { $eq: id } },
          { dictType: { $eq: dictType } },
        ],
      },
    )

    if (!oldRecord) {
      throw badRequest(`字典类型 ${dto.dictType} 不存在`)
    }

    wrap(oldRecord).assign(rest)

    await this.em.persist(oldRecord).flush()
  }

  async remove(dto: RemoveDtoType) {
    const { ids } = dto

    const oldDictTypeRecords = await this.em.find<SysDictTypeEntityType>(SysDictTypeEntityName,
      {
        id: { $in: ids },
      },
    )

    const oldDictDataRecords = await this.em.find<SysDictDataEntityType>(SysDictDataEntityName,
      {
        dictType: { $in: oldDictTypeRecords.map(item => item.dictType) },
      },
    )

    await this.em.remove([].concat(oldDictTypeRecords, oldDictDataRecords)).flush()
  }
}
