import dayjs from 'dayjs'
import ms, { StringValue } from 'ms'

/**
 * 解析 vercel/ms 时间
 * @param type
 * @param value
 */
export function parseMs(type: 'milliseconds' | 'seconds', value: StringValue) {
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
export function getUnixTimestamp(type: 'milliseconds' | 'seconds', value: dayjs.ConfigType = new Date()) {
    if (type === 'seconds') {
        return dayjs(value).unix()
    }
    return dayjs(value).valueOf()
}

