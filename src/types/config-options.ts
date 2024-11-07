import { Secret, SignOptions, VerifyOptions } from 'jsonwebtoken'

export interface ConfigOptions {
    jwt: {
        secret: Secret
        signOptions: SignOptions
        verifyOptions?: VerifyOptions & { complete?: boolean }
    }
}