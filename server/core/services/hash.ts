import bcrypt from '@node-rs/bcrypt'

export const hashService = defineService({
  name: Symbol('HASH_SERVICE'),
  expose: {
    async hash(value: string) {
      const { cost, salt } = configService.get('hash')
      return await bcrypt.hash(value, cost, salt)
    },
    get compare() {
      return bcrypt.compare
    },
    get verify() {
      return bcrypt.compare
    },
  },
})
