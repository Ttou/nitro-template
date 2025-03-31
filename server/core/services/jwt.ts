import jwt, { Header, Validation } from '@node-rs/jsonwebtoken'

export class JwtService {
  private configService: IConfigService
  private cacheService: ICacheService
  private readonly logoutKey = 'logout:'

  constructor(opts: IRegisterOptions) {
    this.configService = opts.configService
    this.cacheService = opts.cacheService
  }

  /**
   * 签名
   * @param payload
   * @param header
   */
  async sign(payload: any, header?: Header) {
    const jwtOptions = this.configService.get<any>('jwt')
    const jti = uuidv4()
    const iat = getUnixTimestamp('seconds')
    const exp = iat + parseMs('seconds', jwtOptions.expiresIn)
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
   */
  async verify(token: string, validation?: Validation) {
    const jwtOptions = this.configService.get('jwt')
    return await jwt.verify(token, jwtOptions.key, validation ?? jwtOptions.validation ?? {})
  }

  /**
   * 添加到已登出
   * @param token
   */
  async addToLogout(token: string) {
    const result = await this.verify(token)
    const ttl = (result.exp - result.iat) * 1000

    this.cacheService.set(this.getCacheKey(result.jti), true, ttl)
  }

  /**
   * 校验是否已登出
   * @param token
   */
  public async verifyLogout(token: string) {
    const result = await this.verify(token)
    const isLogout = await this.cacheService.get(this.getCacheKey(result.jti))

    return isLogout ? true : false
  }

  private getCacheKey(tokenId: string) {
    return this.logoutKey + tokenId
  }
}

export type IJwtService = InstanceType<typeof JwtService>
