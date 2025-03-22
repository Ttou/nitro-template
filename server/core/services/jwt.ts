import jwt, { Header, Validation } from '@node-rs/jsonwebtoken'

export const jwtService = defineService({
  name: Symbol('JWT_SERVICE'),
  priority: 10,
  expose: {
    get logoutKey() {
      return 'logout:'
    },
    async sign(payload: any, header?: Header) {
      const jwtConfig = configService.get('jwt')
      const jti = uuidv4()
      const iat = getUnixTimestamp('seconds')
      const exp = iat + parseMs('seconds', jwtConfig.expiresIn)
      const claims = {
        ...payload,
        jti,
        iat,
        exp,
      }
      return await jwt.sign(claims, jwtConfig.key, header ?? jwtConfig.header ?? {})
    },
    async verify(token: string, validation?: Validation) {
      const jwtConfig = configService.get('jwt')
      return await jwt.verify(token, jwtConfig.key, validation ?? jwtConfig.validation ?? {})
    },
    async addToLogout(token: string) {
      const result = await this.verify(token)
      const ttl = (result.exp - result.iat) * 1000

      cacheService.set(this.getCacheKey(result.jti), true, ttl)
    },
    async verifyLogout(token: string) {
      const result = await this.verify(token)
      const isLogout = await cacheService.get(this.getCacheKey(result.jti))

      return isLogout ? true : false
    },
    getCacheKey(tokenId: string) {
      return this.logoutKey + tokenId
    },
  },
})
