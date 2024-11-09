import bcrypt from '@node-rs/bcrypt'

export async function salt() {
  const salt = await bcrypt.genSalt(10, '2b')

  console.log('salt', salt)
}

export async function hash() {
  const salt = await bcrypt.genSalt(10, '2b')
  const hash = await bcrypt.hash('123456', 10, salt)

  console.log('hash', hash)
}
