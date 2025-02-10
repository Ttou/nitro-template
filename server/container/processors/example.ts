import { Job } from 'bullmq'

export async function exampleProcessor(job: Job) {
  for (let i = 0; i <= 100; i++) {
    await delay(Math.random())
    await job.updateProgress(i)
    await job.log(`Processing job at interval ${i}`)

    if (Math.random() * 200 < 1) throw new Error(`Random error ${i}`)
  }

  return { jobId: `This is the return value of job (${job.id})` }
}
