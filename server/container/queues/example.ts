import { Queue, Worker } from 'bullmq'

export class ExampleQueue {
  private configService: InstanceType<typeof ConfigService>
  private queueName: string = 'example'

  public queue: Queue

  constructor(opt: ContainerRegisters) {
    this.configService = opt.configService
  }

  private async init() {
    const { redis } = this.configService.get('bull')

    this.queue = new Queue(this.queueName, { connection: redis })

    new Worker(
      this.queueName,
      async (job) => {
        for (let i = 0; i <= 100; i++) {
          // await sleep(Math.random())
          await job.updateProgress(i)
          await job.log(`Processing job at interval ${i}`)

          if (Math.random() * 200 < 1) throw new Error(`Random error ${i}`)
        }

        return { jobId: `This is the return value of job (${job.id})` }
      },
      { connection: redis },
    )
  }
}
