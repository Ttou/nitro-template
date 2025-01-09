import { wrap } from '@mikro-orm/core'

export class SystemPostHandler {
  private ormService: InstanceType<typeof OrmService>

  constructor({ ormService }: ContainerRegisters) {
    this.ormService = ormService
  }

  private get em() {
    return this.ormService.em.fork()
  }

  async findPage(dto: FindSystemPostPageDtoType) {
    const { page, pageSize, ...rest } = dto

    const [data, total] = await this.em.findAndCount<SysPostEntityType>(SysPostEntityName,
      {
        $and: [
          { postName: rest.postName ? { $like: `%${rest.postName}%` } : {} },
          { postKey: rest.postKey ? { $like: `%${rest.postKey}%` } : {} },
          { isAvailable: rest.isAvailable ? { $eq: rest.isAvailable } : {} },
          { createdAt: rest.beginTime ? { $gte: rest.beginTime, $lte: rest.endTime } : {} },
        ],
      },
      { limit: pageSize, offset: page - 1 },
    )

    return { page, pageSize, data, total }
  }

  async create(dto: CreateSystemPostDtoType) {
    const { postKey } = dto

    const oldRecord = await this.em.findOne<SysPostEntityType>(SysPostEntityName,
      {
        postKey: { $eq: postKey },
      },
    )

    if (oldRecord) {
      throw badRequest(`岗位标识 ${postKey} 已存在`)
    }

    const newRecord = this.em.create<SysPostEntityType>(SysPostEntityName, dto)

    await this.em.persist(newRecord).flush()
  }

  async update(dto: UpdateSystemPostDtoType) {
    const { id, postKey, ...rest } = dto

    const oldRecord = await this.em.findOne<SysPostEntityType>(SysPostEntityName,
      {
        $and: [
          { id: { $eq: id } },
          { postKey: { $eq: postKey } },
        ],
      },
    )

    if (!oldRecord) {
      throw badRequest(`岗位标识 ${postKey} 不存在`)
    }

    wrap(oldRecord).assign(rest)

    await this.em.persist(oldRecord).flush()
  }

  async remove(dto: RemoveDtoType) {
    const { ids } = dto

    const oldRecords = await this.em.find<SysPostEntityType>(SysPostEntityName,
      {
        id: { $in: ids },
      },
    )

    await this.em.remove(oldRecords).flush()
  }
}
