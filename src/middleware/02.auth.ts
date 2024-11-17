import { asValue } from 'awilix'

export default defineEventHandler(async (event) => {
  // 非登录接口，需要验证token
  const isPrivate = () => {
    const { pathname } = getRequestURL(event)
    return pathname.startsWith('/api/') && !['/api/auth/login'].includes(pathname)
  }

  if (isPrivate()) {
    const authorization = getHeader(event, 'authorization')

    if (!authorization) {
      throw unauthorizedError('authorization 不存在')
    }

    const token = authorization.match(/Bearer (.+)/)?.[1]

    if (!token) {
      throw unauthorizedError('token 不存在')
    }

    const { jwtService, userRepository } = event.context.scope.cradle

    const payload = await jwtService.verify(token)

    const user = await userRepository.findById(payload.sub)

    if (!user) {
      throw unauthorizedError('用户不存在')
    }

    event.context.scope.register({
      currentUser: asValue(user),
    })
  }
})
