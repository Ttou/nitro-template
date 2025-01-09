import bcrypt from '@node-rs/bcrypt'

export class HashService {
  private configService: InstanceType<typeof ConfigService>

  constructor({ configService }: ContainerRegisters) {
    this.configService = configService
  }

  /**
   * 加密
   * @param value
   * @returns
   */
  async hash(value: string) {
    const { cost, salt } = this.configService.get('hash')
    return await bcrypt.hash(value, cost, salt)
  }

  /**
   * 比较
   */
  get compare() {
    return bcrypt.compare
  }

  /**
   * 验证
   */
  get verify() {
    return bcrypt.verify
  }
}
