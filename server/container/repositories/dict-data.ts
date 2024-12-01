import { wrap } from '@mikro-orm/core'

export class DictDataRepository {
  private ormService: InstanceType<typeof OrmService>

  constructor({ ormService }: ContainerRegisters) {
    this.ormService = ormService
  }

  private get em() {
    return this.ormService.em.fork()
  }

  async findList(dto: FindDictDataListDtoType) {
    const data = await this.em.findAll<SysDictDataEntityType>(SysDictDataEntityName,
      {
        where: {
          dictLabel: dto.dictLabel ? { $like: `%${dto.dictLabel}%` } : {},
          isAvailable: dto.isAvailable ? { $eq: dto.isAvailable } : {},
        },
      },
    )

    return data
  }

  async create(dto: CreateDictDataDtoType) {
    const existing = await this.em.findOne<SysDictDataEntityType>(SysDictDataEntityName,
      {
        dictValue: { $eq: dto.dictValue },
      },
    )

    if (existing) {
      throw badRequest(`字典值 ${dto.dictValue} 已存在`)
    }

    const config = this.em.create<SysDictDataEntityType>(SysDictDataEntityName, dto)

    await this.em.persist(config).flush()
  }

  async update(dto: UpdateDictDataDtoType) {
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
    const configs = await this.em.find<SysDictDataEntityType>(SysDictDataEntityName,
      {
        id: { $in: dto.ids },
      },
    )

    await this.em.remove(configs).flush()
  }
}
