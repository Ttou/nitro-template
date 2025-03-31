// 初始化
export default defineEventHandler(async (event) => {
  const bullConfig = diContainer.cradle.configService.get<Record<string, any>>('bull')

  // 拦截 Bull Board 请求
  if (event.path.startsWith(bullConfig.board.path)) {
    const authHeader = getHeader(event, 'authorization')

    if (!authHeader) {
      setResponseStatus(event, 401)
      setResponseHeader(event, 'WWW-Authenticate', 'Basic realm="Protected Area"')
      return 'Authentication required'
    }

    const base64Credentials = authHeader.split(' ')[1]
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8')
    const [username, password] = credentials.split(':')

    const basicAuthConfig = diContainer.cradle.configService.get<Record<string, string>>('basicAuth')

    if (username !== basicAuthConfig.username || password !== basicAuthConfig.password) {
      setResponseStatus(event, 401)
      setResponseHeader(event, 'WWW-Authenticate', 'Basic realm="Protected Area"')
      return 'Invalid credentials'
    }
  }
})
