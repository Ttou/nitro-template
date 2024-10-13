import { LogEvent, Logger } from '@tsed/logger'

function createUseLogger() {
  let logger: Logger

  return function () {
    if (!logger) {
      logger = new Logger('Nitro')

      logger.appenders.set('console-log', {
        type: 'console',
        layout: {
          type: 'pattern',
          pattern: '[%d] [%c] [%z] [%p] - %m',
          tokens: {},
        },
      })
    }

    return logger
  }
}

export const useLogger = createUseLogger()
