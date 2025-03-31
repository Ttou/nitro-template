import { createBullBoard } from '@bull-board/api'
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter'
import { H3Adapter } from '@bull-board/h3'
import { Router } from 'h3'
import { joinURL } from 'ufo'

export class BullBoardService {
  private bullService: IBullService
  private configService: IConfigService
  public ui: Router

  constructor(opts: IRegisterOptions) {
    this.bullService = opts.bullService
    this.configService = opts.configService
  }

  private async init() {
    const bullConfig = this.configService.get<any>('bull')

    const serverAdapter = new H3Adapter()
    serverAdapter.setBasePath(bullConfig.board.path)

    const queues = this.bullService.getQueues().map(queue => new BullMQAdapter(queue))

    createBullBoard({ queues, serverAdapter })

    this.ui = serverAdapter.registerHandlers()

    logger.info(`队列面板地址: ${joinURL('http://localhost:3000', bullConfig.board.path)}`)
  }
}

export type IBullBoardService = InstanceType<typeof BullBoardService>
