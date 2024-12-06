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

    const existing = await this.em.findOne<SysDictDataEntityType>(SysDictDataEntityName,
      {
        dictValue: { $eq: dictValue },
      },
    )

    if (existing) {
      throw badRequest(`字典值 ${dto.dictValue} 已存在`)
    }

    const config = this.em.create<SysDictDataEntityType>(SysDictDataEntityName, dto)

    await this.em.persist(config).flush()
  }

  async update(dto: UpdateSysDictDataDtoType) {
    const { id, dictValue, ...rest } = dto

    const existing = await this.em.findOne<SysDictDataEntityType>(SysDictDataEntityName,
      {
        $and: [
          { id: { $eq: id } },
          { dictValue: { $eq: dictValue } },
        ],
      },
    )

    if (!existing) {
      throw badRequest(`字典值 ${dto.dictValue} 不存在`)
    }

    wrap(existing).assign(rest)

    await this.em.persist(existing).flush()
  }

  async remove(dto: RemoveDtoType) {
    const { ids } = dto

    const configs = await this.em.find<SysDictDataEntityType>(SysDictDataEntityName,
      {
        id: { $in: ids },
      },
    )

    await this.em.remove(configs).flush()
  }
}
