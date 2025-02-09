import dayjs from 'dayjs'
import ms from 'ms'

export class TimeService {
  /**
   * 解析 vercel/ms 时间
   * @param type
   * @param value
   */
  parseMs(type: 'milliseconds' | 'seconds', value: number | string) {
    if (type === 'seconds') {
      return ms(value) / 1000
    }
    return ms(value)
  }

  /**
   * 获取 Unix 时间戳
   * @param type
   * @param value
   */
  getUnix(type: 'milliseconds' | 'seconds', value: dayjs.ConfigType = new Date()) {
    if (type === 'seconds') {
      return dayjs(value).unix()
    }
    return dayjs(value).valueOf()
  }
}
