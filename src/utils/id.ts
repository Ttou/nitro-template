import { nanoid } from 'nanoid'

export function genId(size = 24) {
  return nanoid(size)
}
