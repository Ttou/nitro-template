import { isIP } from 'node:net'

/**
 * 解析 IP
 * @param ip
 */
export async function parseIp(ip: string) {
  if (isIP(ip) === 0) {
    return {
      location: 'UNKNOWN',
      ip: 'UNKNOWN',
    }
  }

  const result = await $fetch<any>('https://api.vore.top/api/IPdata', { method: 'GET', params: { ip } })

  return {
    location: [result.ipdata.info1, result.ipdata.info2, result.ipdata.info3].join(''),
    ip,
  }
}
