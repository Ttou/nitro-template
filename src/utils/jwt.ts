import jwt from 'jsonwebtoken'

export class JwtUtil {
  private secret: string
  private signOptions: any

  public static instance: JwtUtil

  constructor({ secret, signOptions }: any) {
    this.secret = secret
    this.signOptions = signOptions
  }

  /**
   * 初始化
   * @param options 
   */
  public static initialize(options: NitroRuntimeConfig.jwt) {
    if (!JwtUtil.instance) {
      JwtUtil.instance = new JwtUtil(options)
    }
  }

  public async sign(payload: string | object | Buffer) {
    return jwt.sign(payload, this.secret, this.signOptions ?? {})
  }
}
