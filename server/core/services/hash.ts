import bcrypt from '@node-rs/bcrypt'

export class HashService {
  private configService: IConfigService

  constructor(opts: IRegisterOptions) {
    this.configService = opts.configService
  }

  /**
   * 加密
   * @param value
   * @returns
   */
  public async hash(value: string) {
    const { cost, salt } = this.configService.get<any>('hash')
    return await bcrypt.hash(value, cost, salt)
  }

  /**
   * 比较
   */
  public get compare() {
    return bcrypt.compare
  }

  /**
   * 验证
   */
  public get verify() {
    return bcrypt.verify
  }
}

export type IHashService = InstanceType<typeof HashService>
