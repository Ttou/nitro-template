import { asValue } from 'awilix'
import { EventHandlerRequest, H3Event } from 'h3'

// 登录鉴权
export default defineEventHandler(async (event) => {
  // 非登录接口，需要验证token
  const isPrivate = ({ path }: H3Event<EventHandlerRequest>) => {
    return path.startsWith('/api/') && !['/api/auth/login'].includes(path)
  }

  if (isPrivate(event)) {
    const authorization = getHeader(event, 'authorization')

    if (!authorization) {
      throw unauthorizedError('authorization 不存在')
    }

    const token = authorization.match(/Bearer (.+)/)?.[1]

    if (!token) {
      throw unauthorizedError('token 不存在')
    }

    const { jwtService, sysUserRepository } = event.context.scope.cradle

    try {
      const payload = await jwtService.verify(token)

      const user = await sysUserRepository.findById(payload.sub)

      if (!user) {
        throw unauthorizedError('用户不存在')
      }

      event.context.scope.register({
        currentUser: asValue(user),
      })
    }
    catch (error) {
      throw unauthorizedError(error.message)
    }
  }
})
