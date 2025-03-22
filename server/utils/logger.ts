import { createLogger, format, transports } from 'winston'
import { Format, gray, greenBright, redBright, yellowBright } from 'yoctocolors'

function getColoredLevel(level: string) {
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

const logger = createLogger({
  transports: [
    new transports.Console({
      level: 'debug',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
        format.printf((info) => {
          return [
            `[${info.timestamp}]`,
            `[${process.pid}]`,
            getColoredLevel(info.level),
            info.reqId ? `[${info.reqId}]` : undefined,
            info.reqMethod ? `[${info.reqMethod} - ${info.reqUrl}]` : undefined,
            `${info.message}`,
            info.reqTime ? yellowBright(`took ${info.reqTime} ms`) : undefined,
          ]
            .filter(v => v !== undefined)
            .join(' ')
        })),
    }),
  ],
})

export { logger }
