interface IParams {
  name: string | symbol
  priority?: number
  init?: () => void | Promise<void>
  depose?: () => void | Promise<void>
  expose: Record<string, any>
}

export const serviceCenter = {
  map: new Map<IParams['name'], Omit<IParams, 'name'>>(),
  init: async function () {
    const items = Array.from(this.map.values()).sort((a, b) => (a.priority || 0) - (b.priority || 0))

    for (const item of items) {
      await item.init?.()
    }
  },
  depose: async function () {
    const items = Array.from(this.map.values()).sort((a, b) => (b.priority || 0) - (a.priority || 0))

    for (const item of items) {
      await item.depose?.()
    }
  },
  register: function <T extends IParams>(params: T): T['expose'] {
    const { name, ...rest } = params

    if (!this.map.has(name)) {
      this.map.set(name, rest)
    }

    return this.map.get(name)?.expose as T['expose']
  },
}

export function defineService<T extends IParams>(params: T) {
  return serviceCenter.register(params)
}
