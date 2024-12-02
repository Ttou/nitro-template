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
    const { postName, postKey, isAvailable } = dto

    const data = await this.em.findAll<SysPostEntityType>(SysPostEntityName,
      {
        where: {
          postName: postName ? { $like: `%${postName}%` } : {},
          postKey: postKey ? { $like: `%${postKey}%` } : {},
          isAvailable: isAvailable ? { $eq: isAvailable } : {},
        },
      },
    )

    return data
  }

  async create(dto: CreatePostDtoType) {
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

  async update(dto: UpdatePostDtoType) {
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
