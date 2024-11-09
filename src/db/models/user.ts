export class UserModel {
  private static get em() {
    return ORM.orm.em.fork()
  }

  static async findById(id: number) {
    return await this.em.findOne<UserEntityType>(UserEntityName, { id })
  }

  static async findByUsername(username: string) {
    return await this.em.findOne<UserEntityType>(UserEntityName, { username })
  }
}
