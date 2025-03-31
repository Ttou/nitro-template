import { BaseQueue } from './base'

export class ExampleQueue extends BaseQueue {
  constructor(opts?: Omit<IBaseQueueOptions, 'name' | 'processor'>) {
    super({
      name: 'EXAMPLE_QUEUE',
      processor: async (job) => {
        for (let i = 0; i <= 100; i++) {
          await delay(Math.random())
          await job.updateProgress(i)
          await job.log(`Processing job at interval ${i}`)

          if (Math.random() * 200 < 1) throw new Error(`Random error ${i}`)
        }

        return { jobId: `This is the return value of job (${job.id})` }
      },
      ...(opts ?? {}),
    })
  }
}
