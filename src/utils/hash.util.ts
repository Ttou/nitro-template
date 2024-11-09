import bcrypt from '@node-rs/bcrypt'

export class HashUtil {
  private static hashOptions: ConfigType['hash']

  static async init() {
    const { hash } = ConfigUtil.config

    this.hashOptions = hash
  }

  static async hash(value: string) {
    const { cost, salt } = this.hashOptions
    return await bcrypt.hash(value, cost, salt)
  }

  static get compare() {
    return bcrypt.compare
  }

  static get verify() {
    return bcrypt.verify
  }
}
