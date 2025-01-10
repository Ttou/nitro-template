import { createBullBoard } from '@bull-board/api'
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter'
import { H3Adapter } from '@bull-board/h3'
import { Queue } from 'bullmq'
import { Router } from 'h3'

export class BullBoardService {
  private configService: InstanceType<typeof ConfigService>
  private loggerService: InstanceType<typeof LoggerService>
  private queues: Array<Queue>

  public ui: Router

  constructor(opt: ContainerRegisters) {
    this.configService = opt.configService
    this.loggerService = opt.loggerService

    this.queues = [
      opt.exampleQueue.queue,
    ]
  }

  private async init() {
    const { board } = this.configService.get('bull')

    const serverAdapter = new H3Adapter()
    serverAdapter.setBasePath(board.basePath)

    const queues = this.queues.map(queue => new BullMQAdapter(queue))

    createBullBoard({ queues, serverAdapter })

    this.ui = serverAdapter.registerHandlers()

    this.loggerService.debug('队列面板服务初始化完成')
  }
}
