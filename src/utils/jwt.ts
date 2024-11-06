import jwt, { Secret, SignOptions, VerifyOptions } from 'jsonwebtoken'

interface JwtUtilInitializeOptions {
  secret: Secret
  signOptions: SignOptions
  verifyOptions?: VerifyOptions & { complete?: boolean }
}

export class JwtUtil {
  private secret: JwtUtilInitializeOptions['secret']
  private signOptions: JwtUtilInitializeOptions['signOptions']
  private verifyOptions: JwtUtilInitializeOptions['verifyOptions']

  public static instance: JwtUtil

  constructor({ secret, signOptions, verifyOptions }: JwtUtilInitializeOptions) {
    this.secret = secret
    this.signOptions = signOptions
    this.verifyOptions = verifyOptions
  }

  /**
   * 初始化
   * @param options
   */
  public static initialize(options: JwtUtilInitializeOptions) {
    if (!JwtUtil.instance) {
      JwtUtil.instance = new JwtUtil(options)
    }
  }

  /**
   * 生成签名
   * @param payload
   * @param signOptions
   * @returns
   */
  public sign(payload: string | object | Buffer, signOptions?: JwtUtilInitializeOptions['signOptions']) {
    return jwt.sign(payload, this.secret, signOptions ?? this.signOptions ?? {})
  }

  /**
   * 校验签名
   * @param token
   * @param verifyOptions
   * @returns
   */
  public verify(token: string, verifyOptions?: JwtUtilInitializeOptions['verifyOptions']) {
    return jwt.verify(token, this.secret, verifyOptions ?? this.verifyOptions ?? {})
  }
}
