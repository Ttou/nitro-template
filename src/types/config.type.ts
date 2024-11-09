import { MikroORMOptions } from '@mikro-orm/core'
import { MySqlDriver } from '@mikro-orm/mysql'
import { Header, Validation } from '@node-rs/jsonwebtoken'

export interface ConfigType {
  jwt: {
    key: string
    expiresIn: string
    header?: Header
    validation?: Validation
  }

  orm: MikroORMOptions<MySqlDriver>

  hash: {
    salt: string
    version?: '2a' | '2x' | '2y' | '2b'
    cost?: number
  }

}
