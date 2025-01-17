import { wrap } from '@mikro-orm/core'

export class CurrentUserHandler {
  private hashService: InstanceType<typeof HashService>
  private ormService: InstanceType<typeof OrmService>

  constructor({ hashService, ormService }: ContainerRegisters) {
    this.hashService = hashService
    this.ormService = ormService
  }

  private get em() {
    return this.ormService.em.fork()
  }

  public async info(user: SysUserEntityType) {}

  public async profile(user: SysUserEntityType) {}

  public async updateBase() {}

  async updatePassword(dto: UpdateCurrentUserPasswordDtoType, user: SysUserEntityType) {
    const isMatch = await this.hashService.compare(dto.oldPassword, user.password)

    if (!isMatch) {
      throw badRequest('旧密码错误')
    }

    const oldRecord = await this.em.findOne<SysUserEntityType>(SysUserEntityName, {
      $and: [
        { id: { $eq: user.id } },
        { userName: { $eq: user.userName } },
      ],
    })

    if (!oldRecord) {
      throw badRequest('用户不存在')
    }

    const password = await this.hashService.hash(dto.newPassword)

    wrap(oldRecord).assign({ password })

    await this.em.persist(oldRecord).flush()
  }
}
