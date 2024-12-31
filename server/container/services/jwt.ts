import jwt, { Header, Validation } from '@node-rs/jsonwebtoken'

export class JwtService {
  private configService: InstanceType<typeof ConfigService>
  private timeService: InstanceType<typeof TimeService>
  private idService: InstanceType<typeof IdService>
  private cacheService: InstanceType<typeof CacheService>
  private blacklistKey = 'jwt:blacklist:'

  constructor({ configService, timeService, idService, cacheService }: ContainerRegisters) {
    this.configService = configService
    this.timeService = timeService
    this.idService = idService
    this.cacheService = cacheService
  }

  /**
   * 签名
   * @param payload
   * @param header
   * @returns
   */
  async sign(payload: any, header?: Header) {
    const jwtOptions = this.configService.get('jwt')
    const jti = this.idService.v4()
    const iat = this.timeService.getUnix('seconds')
    const exp = iat + this.timeService.parseMs('seconds', jwtOptions.expiresIn)
    const claims = {
      ...payload,
      jti,
      iat,
      exp,
    }
    return await jwt.sign(claims, jwtOptions.key, header ?? jwtOptions.header ?? {})
  }

  /**
   * 校验
   * @param token
   * @param validation
   * @returns
   */
  async verify(token: string, validation?: Validation) {
    const jwtOptions = this.configService.get('jwt')
    return await jwt.verify(token, jwtOptions.key, validation ?? jwtOptions.validation ?? {})
  }

  /**
   * 添加到黑名单
   * @param token
   */
  async addToBlacklist(token: string) {
    const result = await this.verify(token)
    const ttl = (result.exp - result.iat) * 1000

    this.cacheService.set(`${this.blacklistKey}${result.jti}`, true, ttl)
  }

  /**
   * 校验黑名单
   * @param token
   */
  async validateBlacklist(token: string) {
    const result = await this.verify(token)
    const inBlacklist = await this.cacheService.get(`${this.blacklistKey}${result.jti}`)

    return inBlacklist ? true : false
  }
}
