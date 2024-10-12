import { Logger, LogEvent } from "@tsed/logger"

const logger = new Logger('Nitro')

logger.appenders.set('console-log', {
  type: 'console',
  layout: {
    type: 'pattern',
    pattern: "[%d] [%c] [%z] [%p] - %m"
  }
})

export { logger }