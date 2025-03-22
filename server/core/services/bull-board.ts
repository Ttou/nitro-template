import { createBullBoard } from '@bull-board/api'
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter'
import { H3Adapter } from '@bull-board/h3'
import { Router } from 'h3'
import { joinURL } from 'ufo'

export const bullBoardService = defineService({
  name: Symbol('BULL_BOARD_SERVICE'),
  priority: 21,
  async init() {
    const bullConfig = configService.get('bull')

    const serverAdapter = new H3Adapter()
    serverAdapter.setBasePath(bullConfig.board.path)

    const queues = bullService.getQueues().map(queue => new BullMQAdapter(queue))

    createBullBoard({ queues, serverAdapter })

    this.expose.ui = serverAdapter.registerHandlers()

    logger.info(`队列面板地址: ${joinURL('http://localhost:3000', bullConfig.board.path)}`)
  },
  expose: {
    ui: {} as Router,
  },
})
