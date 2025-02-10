import { Queue, QueueOptions, RedisConnection, Worker, WorkerOptions } from 'bullmq'

interface IDefineQueueOptions {
    queueName: string
    processor: ConstructorParameters<typeof Worker>[1]
    connection: typeof RedisConnection
    queueOptions?: QueueOptions
    workerOptions?: WorkerOptions
}

export function defineQueue({ queueName, processor, connection, queueOptions, workerOptions }: IDefineQueueOptions) {
    const [queue, worker] = [new Queue(queueName, queueOptions, connection), new Worker(queueName, processor, workerOptions, connection)]

    return { queue, worker }
}