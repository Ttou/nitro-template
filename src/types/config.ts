import { MikroORMOptions } from '@mikro-orm/core'
import { MySqlDriver } from '@mikro-orm/mysql'
import { Secret, SignOptions, VerifyOptions } from 'jsonwebtoken'

export interface ConfigType {
  jwt: {
    secret: Secret
    signOptions: SignOptions
    verifyOptions?: VerifyOptions & { complete?: boolean }
  }

  orm: MikroORMOptions<MySqlDriver>
}
