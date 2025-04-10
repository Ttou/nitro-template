import { _RequestMiddleware } from 'h3'

export function useBasicAuthentication(): _RequestMiddleware {
  return async function () {
    const event = useEvent()
    const authHeader = getHeader(event, 'authorization')

    if (!authHeader) {
      setResponseStatus(event, 401)
      setResponseHeader(event, 'WWW-Authenticate', 'Basic realm="Protected Area"')
      return
    }

    const base64Credentials = authHeader.split(' ')[1]
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8')
    const [username, password] = credentials.split(':')

    const basicAuthConfig = diContainer.cradle.configService.get<Record<string, string>>('basicAuth')

    if (username !== basicAuthConfig.username || password !== basicAuthConfig.password) {
      setResponseStatus(event, 401)
      setResponseHeader(event, 'WWW-Authenticate', 'Basic realm="Protected Area"')
      return
    }
  }
}
