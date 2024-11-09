import bcrypt from '@node-rs/bcrypt'

function createUseHash() {
  let hashOptions: ConfigType['hash']

  const init = async () => {
    const { hash } = await useConfig()

    hashOptions = hash
  }

  const hash = async (value: string) => {
    return await bcrypt.hash(value, hashOptions.cost, hashOptions.salt)
  }

  const compare = async (value: string, hash: string) => {
    return await bcrypt.compare(value, hash)
  }

  const verify = async (value: string, hash: string) => {
    return await bcrypt.verify(value, hash)
  }

  return async function () {
    if (!hashOptions) {
      await init()
    }

    return {
      hash,
      compare,
      verify,
    }
  }
}

export const useHash = createUseHash()
