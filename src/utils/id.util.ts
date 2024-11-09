import { nanoid } from 'nanoid'

export class IdUtil {
  static get generateId() {
    return nanoid
  }
}
