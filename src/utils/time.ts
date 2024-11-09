import dayjs from 'dayjs'
import ms from 'ms'

function createUseTime() {
  const init = async () => {}

  const parseMs = (type: 'milliseconds' | 'seconds', value: string) => {
    if (type === 'seconds') {
      return ms(value) / 1000
    }
    return ms(value)
  }

  const getUnix = (type: 'milliseconds' | 'seconds', value: dayjs.ConfigType = new Date()) => {
    if (type === 'seconds') {
      return dayjs(value).unix()
    }
    return dayjs(value).valueOf()
  }

  const sleep = (seconds: number) => {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000))
  }

  return async function () {
    return {
      parseMs,
      getUnix,
      sleep,
    }
  }
}

export const useTime = createUseTime()
