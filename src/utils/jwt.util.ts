import jwt from '@node-rs/jsonwebtoken'

export class JwtUtil {
  private static jwtOptions: ConfigType['jwt']

  static async init() {
    const { jwt } = ConfigUtil.config

    this.jwtOptions = jwt
  }

  static async sign(payload: any, header?: ConfigType['jwt']['header']) {
    const iat = TimeUtil.getUnix('seconds')
    const exp = iat + TimeUtil.parseMs('seconds', this.jwtOptions.expiresIn)
    const claims = {
      ...payload,
      iat,
      exp,
    }
    return await jwt.sign(claims, this.jwtOptions.key, header ?? this.jwtOptions.header ?? {})
  }

  static async verify(token: string, validation?: ConfigType['jwt']['validation']) {
    return await jwt.verify(token, this.jwtOptions.key, validation ?? this.jwtOptions.validation ?? {})
  }
}
