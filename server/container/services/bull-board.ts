import { createBullBoard } from '@bull-board/api'
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter'
import { H3Adapter } from '@bull-board/h3'
import { Router } from 'h3'
import { joinURL } from 'ufo'

export class BullBoardService {
  private configService: InstanceType<typeof ConfigService>
  private loggerService: InstanceType<typeof LoggerService>
  private bullService: InstanceType<typeof BullService>

  public ui: Router

  constructor(opts: ContainerRegisters) {
    this.configService = opts.configService
    this.loggerService = opts.loggerService
    this.bullService = opts.bullService
  }

  private async init() {
    const { board } = this.configService.get('bull')

    const serverAdapter = new H3Adapter()
    serverAdapter.setBasePath(board.path)

    const queues = this.bullService.getQueues().map(([_, queue]) => new BullMQAdapter(queue))

    createBullBoard({ queues, serverAdapter })

    this.ui = serverAdapter.registerHandlers()

    this.loggerService.info(`队列面板地址: ${joinURL('http://localhost:3000', board.path)}`)
  }
}
