import jwt from '@node-rs/jsonwebtoken'

function createUseJwt() {
  let jwtOptions: ConfigType['jwt']

  const init = async () => {
    const { jwt } = await useConfig()

    jwtOptions = jwt
  }

  const sign = async (payload: any, header?: ConfigType['jwt']['header']) => {
    const { parseMs, getUnix } = await useTime()
    const iat = getUnix('seconds')
    const exp = iat + parseMs('seconds', jwtOptions.expiresIn)
    const claims = {
      ...payload,
      iat,
      exp,
    }
    return await jwt.sign(claims, jwtOptions.key, header ?? jwtOptions.header ?? {})
  }

  const verify = async (token: string, validation?: ConfigType['jwt']['validation']) => {
    return await jwt.verify(token, jwtOptions.key, validation ?? jwtOptions.validation ?? {})
  }

  return async function () {
    if (!jwtOptions) {
      await init()
    }

    return {
      sign,
      verify,
    }
  }
}

export const useJwt = createUseJwt()
