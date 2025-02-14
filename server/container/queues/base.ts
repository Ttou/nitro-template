import { Queue, QueueBaseOptions, QueueOptions, Worker } from 'bullmq'
import { cloneDeep, merge } from 'es-toolkit'

interface ICreateOptions {
    name: string
    processor: ConstructorParameters<typeof Worker>[1]
    options: QueueBaseOptions
    queueOptions?: QueueOptions
    workerOptions?: WorkerOptions
  }

export abstract class BaseQueue {
    public queue: Queue
    public worker: Worker

    public create({ name, processor, options, queueOptions, workerOptions }: ICreateOptions) {  
        this.queue = new Queue(name, merge(cloneDeep(options), queueOptions ?? {}))
        this.worker = new Worker(name, processor, merge(cloneDeep(options), workerOptions ?? {}))
    }
}