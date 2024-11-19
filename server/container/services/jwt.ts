import jwt, { Header, Validation } from '@node-rs/jsonwebtoken'

export class JwtService {
  private configService: InstanceType<typeof ConfigService>
  private timeService: InstanceType<typeof TimeService>

  constructor({ configService, timeService }: ContainerRegisters) {
    this.configService = configService
    this.timeService = timeService
  }

  /**
   * 签名
   * @param payload
   * @param header
   * @returns
   */
  async sign(payload: any, header?: Header) {
    const jwtOptions = this.configService.get('jwt')
    const iat = this.timeService.getUnix('seconds')
    const exp = iat + this.timeService.parseMs('seconds', jwtOptions.expiresIn)
    const claims = {
      ...payload,
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
}
