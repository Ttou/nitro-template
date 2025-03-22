import { Queue, QueueBaseOptions, QueueOptions, Worker } from 'bullmq'
import { cloneDeep, merge } from 'es-toolkit'

interface IParams {
  name: string
  processor: ConstructorParameters<typeof Worker>[1]
  options?: QueueBaseOptions
  queueOptions?: QueueOptions
  workerOptions?: WorkerOptions
}

export const queueCenter = {
  map: new Map<string, Omit<IParams, 'name'>>(),
  register: function (params: IParams) {
    const { name, ...rest } = params

    if (!this.map.has(name)) {
      this.map.set(name, rest)
    }

    return name
  },
}

export function defineQueue(params: IParams) {
  return queueCenter.register(params)
}
