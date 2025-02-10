import { Queue, QueueOptions, RedisConnection, Worker, WorkerOptions } from 'bullmq'
import { isFunction } from 'es-toolkit'

interface IDefineQueueOptions {
    queueName: string
    processor: ConstructorParameters<typeof Worker>[1]
    connection: typeof RedisConnection
    queueOptions?: QueueOptions
    workerOptions?: WorkerOptions
    bindEvents?: (queue: Queue, worker: Worker) => void
}

export function defineQueue({ queueName, processor, connection, queueOptions, workerOptions, bindEvents }: IDefineQueueOptions) {
    const [queue, worker] = [new Queue(queueName, queueOptions, connection), new Worker(queueName, processor, workerOptions, connection)]

    if (bindEvents && isFunction(bindEvents)) {
        bindEvents(queue, worker)
    }
    return { queue, worker }
}