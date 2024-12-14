import { wrap } from '@mikro-orm/core'

export class SysDictDataRepository {
  private ormService: InstanceType<typeof OrmService>

  constructor({ ormService }: ContainerRegisters) {
    this.ormService = ormService
  }

  private get em() {
    return this.ormService.em.fork()
  }

  async findList(dto: FindSysDictDataListDtoType) {
    const { dictLabel, isAvailable } = dto

    const data = await this.em.findAll<SysDictDataEntityType>(SysDictDataEntityName,
      {
        where: {
          dictLabel: dictLabel ? { $like: `%${dictLabel}%` } : {},
          isAvailable: isAvailable ? { $eq: isAvailable } : {},
        },
      },
    )

    return data
  }

  async create(dto: CreateSysDictDataDtoType) {
    const { dictValue } = dto

    const oldRecord = await this.em.findOne<SysDictDataEntityType>(SysDictDataEntityName,
      {
        dictValue: { $eq: dictValue },
      },
    )

    if (oldRecord) {
      throw badRequest(`字典值 ${dto.dictValue} 已存在`)
    }

    const config = this.em.create<SysDictDataEntityType>(SysDictDataEntityName, dto)

    await this.em.persist(config).flush()
  }

  async update(dto: UpdateSysDictDataDtoType) {
    const { id, dictValue, ...rest } = dto

    const oldRecord = await this.em.findOne<SysDictDataEntityType>(SysDictDataEntityName,
      {
        $and: [
          { id: { $eq: id } },
          { dictValue: { $eq: dictValue } },
        ],
      },
    )

    if (!oldRecord) {
      throw badRequest(`字典值 ${dto.dictValue} 不存在`)
    }

    wrap(oldRecord).assign(rest)

    await this.em.persist(oldRecord).flush()
  }

  async remove(dto: RemoveDtoType) {
    const { ids } = dto

    const oldRecords = await this.em.find<SysDictDataEntityType>(SysDictDataEntityName,
      {
        id: { $in: ids },
      },
    )

    await this.em.remove(oldRecords).flush()
  }
}
