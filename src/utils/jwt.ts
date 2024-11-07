import jwt from 'jsonwebtoken'

function createUseJwt() {
  let jwtOptions: ConfigOptions['jwt']

  const setup = async () => {
    const { jwt } = await useConfig()
    jwtOptions = jwt
  }

  const sign = (payload: string | object | Buffer, signOptions?: ConfigOptions['jwt']['signOptions']) => {
    return jwt.sign(payload, jwtOptions.secret, signOptions ?? jwtOptions.signOptions ?? {})
  }

  const verify = (token: string, verifyOptions?: ConfigOptions['jwt']['verifyOptions']) => {
    return jwt.verify(token, jwtOptions.secret, verifyOptions ?? jwtOptions.verifyOptions ?? {})
  }

  return async function() {
    if (!jwtOptions) {
      await setup()
    }

    return {
      sign,
      verify
    }
  }
}

export const useJwt = createUseJwt()