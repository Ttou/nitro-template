import { wrap } from '@mikro-orm/core'

export class PostRepository {
  private ormService: InstanceType<typeof OrmService>

  constructor({ ormService }: ContainerRegisters) {
    this.ormService = ormService
  }

  private get em() {
    return this.ormService.em.fork()
  }

  async findList(dto: FindPostListDtoType) {
    const { postName, postCode, isAvailable } = dto

    const data = await this.em.findAll<SysPostEntityType>(SysPostEntityName,
      {
        where: {
          postName: postName ? { $like: `%${postName}%` } : {},
          postCode: postCode ? { $like: `%${postCode}%` } : {},
          isAvailable: isAvailable ? { $eq: isAvailable } : {},
        },
      },
    )

    return data
  }

  async create(dto: CreatePostDtoType) {
    const { postCode } = dto

    const oldRecord = await this.em.findOne<SysPostEntityType>(SysPostEntityName,
      {
        postCode: { $eq: postCode },
      },
    )

    if (oldRecord) {
      throw badRequest(`岗位编码 ${postCode} 已存在`)
    }

    const newRecord = this.em.create<SysPostEntityType>(SysPostEntityName, dto)

    await this.em.persist(newRecord).flush()
  }

  async update(dto: UpdatePostDtoType) {
    const { id, postCode, ...rest } = dto

    const oldRecord = await this.em.findOne<SysPostEntityType>(SysPostEntityName,
      {
        $and: [
          { id: { $eq: id } },
          { postCode: { $eq: postCode } },
        ],
      },
    )

    if (!oldRecord) {
      throw badRequest(`岗位编码 ${postCode} 不存在`)
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
