import { Queue } from 'bullmq';
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { H3Adapter } from '@bull-board/h3';

let queue: Queue

export function initQueue(app) {
    const serverAdapter = new H3Adapter()
    queue = new Queue('Bull', { connection: getRedisConfig() })
    createBullBoard({
        queues: [new BullMQAdapter(queue)],
        serverAdapter,
    });
}

export { queue }