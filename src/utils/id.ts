import { nanoid } from 'nanoid'

export class ID {
  static use() {
    return {
      generateId: this.generateId,
    }
  }

  private static get generateId() {
    return nanoid
  }
}
