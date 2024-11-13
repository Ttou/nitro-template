import { v4, v7 } from 'uuid'

export class IdService {
  get v4() {
    return v4
  }

  get v7() {
    return v7
  }
}
