import { Secret, SignOptions, VerifyOptions } from 'jsonwebtoken'

export interface ConfigType {
  jwt: {
    secret: Secret
    signOptions: SignOptions
    verifyOptions?: VerifyOptions & { complete?: boolean }
  }
}
