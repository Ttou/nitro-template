import jwt from 'jsonwebtoken'

export class JwtUtil {
  private secret: string
  private signOptions: any

  public static instance: JwtUtil

  constructor({ secret, signOptions }: any) {
    this.secret = secret
    this.signOptions = signOptions
  }

  public static initialize(options: any) {
    if (!JwtUtil.instance) {
      JwtUtil.instance = new JwtUtil(options)
    }
  }

  public async sign(payload) {
    return jwt.sign(payload, this.secret, this.signOptions ?? {})
  }
}
