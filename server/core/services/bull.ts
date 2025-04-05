import { Queue, Worker } from 'bullmq'
import { cloneDeep, merge } from 'es-toolkit'

export class BullService {
  private configService: IConfigService
  private map: Map<string, [Queue, Worker]> = new Map()

  constructor(opts: IRegisterOptions) {
    this.configService = opts.configService
  }

  private async init() {
    const bullConfig = this.configService.get<any>('bull')
    const arr = [new ExampleQueue(), new OnlineQueue()]

    for (const item of arr) {
      // @ts-ignore
      const name = item.constructor.queueName
      const queue = new Queue(name, merge(cloneDeep(bullConfig.options), item.queueOptions ?? {}))
      const worker = new Worker(name, item.processor, merge(cloneDeep(bullConfig.options), item.workerOptions ?? {}))
      this.map.set(name, [queue, worker])
    }

    logger.debug('队列服务初始化完成')
  }

  public getQueues() {
    return Array.from(this.map.values()).map(([queue]) => queue)
  }

  public getQueue(name: string) {
    return this.map.get(name)?.[0]
  }
}

export type IBullService = InstanceType<typeof BullService>
