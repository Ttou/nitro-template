import { UAParser } from 'ua-parser-js'

/**
 * 解析 ua
 * @param ua
 */
export function parseUa(ua: string) {
  return UAParser(ua)
}
