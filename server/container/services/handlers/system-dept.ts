import { wrap } from '@mikro-orm/core'

export class SystemDeptHandler {
  private ormService: InstanceType<typeof OrmService>

  constructor({ ormService }: ContainerRegisters) {
    this.ormService = ormService
  }

  private get em() {
    return this.ormService.em.fork()
  }

  async findList(dto: FindSystemDeptListDtoType) {
    const { deptName, deptKey, isAvailable } = dto

    const data = await this.em.findAll<SysDeptEntityType>(SysDeptEntityName,
      {
        where: {
          deptName: deptName ? { $like: `%${deptName}%` } : {},
          deptKey: deptKey ? { $like: `%${deptKey}%` } : {},
          isAvailable: isAvailable ? { $eq: isAvailable } : {},
        },
      },
    )

    return data
  }

  async create(dto: CreateSystemDeptDtoType) {
    const { deptKey } = dto

    const oldRecord = await this.em.findOne<SysDeptEntityType>(SysDeptEntityName,
      {
        deptKey: { $eq: deptKey },
      },
    )

    if (oldRecord) {
      throw badRequest(`部门标识 ${deptKey} 已存在`)
    }

    const newRecord = this.em.create<SysDeptEntityType>(SysDeptEntityName, dto)

    await this.em.persist(newRecord).flush()
  }

  async update(dto: UpdateSystemDeptDtoType) {
    const { id, deptKey, ...rest } = dto

    const oldRecord = await this.em.findOne<SysDeptEntityType>(SysDeptEntityName,
      {
        $and: [
          { id: { $eq: id } },
          { deptKey: { $eq: deptKey } },
        ],
      },
    )

    if (!oldRecord) {
      throw badRequest(`部门标识 ${deptKey} 不存在`)
    }

    wrap(oldRecord).assign(rest)

    await this.em.persist(oldRecord).flush()
  }

  async remove(dto: RemoveDtoType) {
    const { ids } = dto

    const oldRecords = await this.em.find<SysDeptEntityType>(SysDeptEntityName,
      {
        id: { $in: ids },
      },
    )

    await this.em.remove(oldRecords).flush()
  }
}
