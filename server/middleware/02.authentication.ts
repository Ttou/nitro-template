import { asValue } from 'awilix'

// 登录鉴权
export default defineEventHandler(async (event) => {
  if (isPrivatePath(event)) {
    const token = getTokenFormEvent(event)
    const { jwtService, ormService } = event.context.scope.cradle

    try {
      const inBacklist = await jwtService.validateBlacklist(token)

      if (inBacklist) {
        throw unauthorizedError('token 已过期')
      }

      const payload = await jwtService.verify(token)
      const user = await ormService.em.fork().findOne<ISysUserEntity>(EntityNameEnum.SysUser,
        {
          id: { $eq: payload.sub },
        },
      )

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
