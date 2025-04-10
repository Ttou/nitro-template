import { QueueBaseOptions, QueueOptions, Worker } from 'bullmq'

export interface IBaseQueueOptions {
  processor: ConstructorParameters<typeof Worker>[1]
  options?: QueueBaseOptions
  queueOptions?: QueueOptions
  workerOptions?: WorkerOptions
}

export class BaseQueue {
  public processor: IBaseQueueOptions['processor']
  public options?: IBaseQueueOptions['options']
  public queueOptions?: IBaseQueueOptions['queueOptions']
  public workerOptions?: IBaseQueueOptions['workerOptions']

  constructor(opts: IBaseQueueOptions) {
    this.processor = opts.processor
    this.options = opts.options
    this.queueOptions = opts.queueOptions
    this.workerOptions = opts.workerOptions
  }
}
