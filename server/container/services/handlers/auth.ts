export class AuthHandler {
  private hashService: InstanceType<typeof HashService>
  private jwtService: InstanceType<typeof JwtService>
  private ormService: InstanceType<typeof OrmService>

  constructor({ hashService, jwtService, ormService }: ContainerRegisters) {
    this.hashService = hashService
    this.jwtService = jwtService
    this.ormService = ormService
  }

  private get em() {
    return this.ormService.em.fork()
  }

  async login(dto: LoginDtoType) {
    const user = await this.em.findOne<SysUserEntityType>(SysUserEntityName, { userName: dto.userName })

    if (!user) {
      throw badRequest('用户不存在')
    }

    const isMatch = await this.hashService.compare(dto.password, user.password)

    if (!isMatch) {
      throw badRequest('账号或密码错误')
    }

    const token = await this.jwtService.sign({ sub: user.id.toString() })

    return token
  }

  async logout(token: string) {
    await this.jwtService.addToBlacklist(token)
  }
}
