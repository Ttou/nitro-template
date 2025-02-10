import { Queue, QueueBaseOptions, QueueOptions, Worker, WorkerOptions } from 'bullmq'
import { cloneDeep, isFunction, merge } from 'es-toolkit'

export interface IDefineQueueOptions {
  queueName: string
  processor: ConstructorParameters<typeof Worker>[1]
  options: QueueBaseOptions
  queueOptions?: QueueOptions
  workerOptions?: WorkerOptions
  bindEvents?: (queue: Queue, worker: Worker) => void
}

export function defineQueue({ queueName, processor, options, queueOptions, workerOptions, bindEvents }: IDefineQueueOptions) {
  const [queue, worker] = [
    new Queue(queueName, merge(cloneDeep(options), queueOptions ?? {})),
    new Worker(queueName, processor, merge(cloneDeep(options), workerOptions ?? {})),
  ]

  if (bindEvents && isFunction(bindEvents)) {
    bindEvents(queue, worker)
  }
  return { queue, worker }
}
