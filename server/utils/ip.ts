/**
 * 策略
 */
const strategy = {
  /**
   * 支持IPv4和IPv6地址查询，返回IP地址的地理信息，无频率限制。
   */
  vore: async (ip: string) => {
    const result = await $fetch<any>('https://api.vore.top/api/IPdata', { method: 'GET', params: { ip } })

    return `${result.ipdata.info1}${result.ipdata.info2}${result.ipdata.info3}`
  },
}

/**
 * 解析 IP
 * @param ip
 */
export async function parseIp(ip: string) {
  return await strategy['vore'](ip)
}
