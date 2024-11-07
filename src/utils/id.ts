import { nanoid } from 'nanoid'

function createUseId() {
  return function () {
    return {
      nanoid,
    }
  }
}

export const useId = createUseId()
