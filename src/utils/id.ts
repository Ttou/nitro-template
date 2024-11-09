import { nanoid } from 'nanoid'

function createUseId() {
  const generateId = nanoid

  return function () {
    return {
      generateId,
    }
  }
}

export const useId = createUseId()
