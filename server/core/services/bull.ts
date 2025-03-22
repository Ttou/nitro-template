import { Queue, Worker } from 'bullmq'
import { cloneDeep, merge } from 'es-toolkit'

export const bullService = defineService({
  name: Symbol('BULL_SERVICE'),
  priority: 20,
  async init() {
    const bullConfig = configService.get('bull')

    for (const [name, item] of queueCenter.map.entries()) {
      const queue = new Queue(name, merge(cloneDeep(bullConfig.options), item.queueOptions ?? {}))
      const worker = new Worker(name, item.processor, merge(cloneDeep(bullConfig.options), item.workerOptions ?? {}))

      this.expose.map.set(name, [queue, worker])
    }

    logger.debug('队列服务初始化完成')
  },
  expose: {
    map: new Map<string, [Queue, Worker]>(),
    getQueues() {
      return Array.from(this.map.values()).map(([queue]) => queue)
    },
    getWorkers() {
      return Array.from(this.map.values()).map(([, worker]) => worker)
    },
  },
})
