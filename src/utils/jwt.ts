import jwt from '@node-rs/jsonwebtoken'

function createUseJwt() {
  let jwtOptions: ConfigType['jwt']

  const init = async () => {
    const { jwt } = await useConfig()

    jwtOptions = jwt
  }

  const sign = async (payload: Record<string, any>, header?: ConfigType['jwt']['header']) => {
    return await jwt.sign(payload, jwtOptions.key, header ?? jwtOptions.header ?? {})
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
