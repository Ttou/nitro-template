import dayjs from 'dayjs'
import ms from 'ms'

export class TimeUtil {
  static parseMs(type: 'milliseconds' | 'seconds', value: string) {
    if (type === 'seconds') {
      return ms(value) / 1000
    }
    return ms(value)
  }

  static getUnix(type: 'milliseconds' | 'seconds', value: dayjs.ConfigType = new Date()) {
    if (type === 'seconds') {
      return dayjs(value).unix()
    }
    return dayjs(value).valueOf()
  }

  static sleep(seconds: number) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000))
  }
}
