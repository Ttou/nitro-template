import { Queue, Worker } from 'bullmq'

export class BullService {
  private configService: IConfigService
  private loggerService: ILoggerService
  private queues: Map<string, Queue>
  private workers: Map<string, Worker>

  constructor(opts: IContainerRegisters) {
    this.configService = opts.configService
    this.loggerService = opts.loggerService
    this.queues = new Map()
    this.workers = new Map()
  }

  private async init() {
    const { options } = this.configService.get('bull')

    const queues = [
      defineQueue({ queueName: QueueNameEnum.EXAMPLE, processor: exampleProcessor, options }),
    ]

    for (const item of queues) {
      this.queues.set(item.queue.name, item.queue)
      this.workers.set(item.worker.name, item.worker)
    }

    this.loggerService.debug('队列服务初始化完成')
  }

  public getQueues() {
    return Array.from(this.queues)
  }

  public getWorkers() {
    return Array.from(this.workers)
  }

  public getQueue(queueName: string) {
    return this.queues.get(queueName)
  }

  public getWorker(queueName: string) {
    return this.workers.get(queueName)
  }
}

export type IBullService = InstanceType<typeof BullService>