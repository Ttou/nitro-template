import { createLogger, format, LeveledLogMethod, Logger, transports } from 'winston'
import { Format, gray, greenBright, redBright, yellowBright } from 'yoctocolors'

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
                `[${process.pid}]`,
                this.getColoredLevel(info.level),
                info.reqId ? `[${info.reqId}]` : undefined,
                info.reqMethod ? `[${info.reqMethod} - ${info.reqUrl}]` : undefined,
                `${info.message}`,
                info.reqTime ? yellowBright(`${info.reqTime}s`) : undefined,
              ]
                .filter(v => v !== undefined)
                .join(' ')
            })),
        }),
      ],
    })

    this.logger.debug('日志服务初始化完成')
  }

  private getColoredLevel(level: string) {
    let func: Format

    switch (level) {
      case 'info':
        func = greenBright
        break
      case 'verbose':
      case 'debug':
        func = gray
        break
      case 'warn':
        func = yellowBright
        break
      case 'error':
        func = redBright
        break
    }

    return func(`[${level.toUpperCase()}]`)
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
}
