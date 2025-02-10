import { Queue, Worker } from "bullmq"

export class BullService {
    private configService: InstanceType<typeof ConfigService>
    private loggerService: InstanceType<typeof LoggerService>
    private queues: Map<string, Queue>
    private workers: Map<string, Worker>

    constructor(opts: ContainerRegisters) {
        this.configService = opts.configService
        this.loggerService = opts.loggerService
    }

    private init() {
        const { options } = this.configService.get('bull')

        const queues = [
            defineQueue({
                queueName: QueueNameEnum.EXAMPLE,
                processor: async (job) => {
                    for (let i = 0; i <= 100; i++) {
                        await delay(Math.random())
                        await job.updateProgress(i)
                        await job.log(`Processing job at interval ${i}`)
              
                        if (Math.random() * 200 < 1) throw new Error(`Random error ${i}`)
                      }
              
                      return { jobId: `This is the return value of job (${job.id})` }
                },
                connection: options,
            })
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