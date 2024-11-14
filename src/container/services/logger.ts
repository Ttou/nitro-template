import { createLogger, format, LeveledLogMethod, Logger, transports } from 'winston'

export class LoggerService {
  private logger: Logger

  private async init() {
    this.logger = createLogger({
      transports: [
        new transports.Console({
          level: 'debug',
          format: format.combine(
            format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
            format.printf((info) => {
              return [
                `[${info.timestamp}]`,
                `[${info.level.toUpperCase()}]`,
                info.reqId ? `[${info.reqId}]` : undefined,
                `${info.message}`,
                info.reqTime ? `${info.reqTime}s` : undefined,
              ]
                .filter(v => v !== undefined)
                .join(' ')
            })),
        }),
      ],
    })

    this.logger.debug('日志服务初始化完成')
  }

  get debug(): LeveledLogMethod {
    return this.logger.debug.bind(this.logger)
  }

  get info(): LeveledLogMethod {
    return this.logger.info.bind(this.logger)
  }

  get error(): LeveledLogMethod {
    return this.logger.error.bind(this.logger)
  }

  get warn(): LeveledLogMethod {
    return this.logger.warn.bind(this.logger)
  }

  get verbose(): LeveledLogMethod {
    return this.logger.verbose.bind(this.logger)
  }

  get help(): LeveledLogMethod {
    return this.logger.help.bind(this.logger)
  }

  get data(): LeveledLogMethod {
    return this.logger.data.bind(this.logger)
  }

  get prompt(): LeveledLogMethod {
    return this.logger.prompt.bind(this.logger)
  }

  get input(): LeveledLogMethod {
    return this.logger.input.bind(this.logger)
  }

  get silly(): LeveledLogMethod {
    return this.logger.silly.bind(this.logger)
  }
}
