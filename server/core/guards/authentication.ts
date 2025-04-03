export function AuthenticationGuard() {
  return async function () {
    const event = useEvent()
    const token = useToken()

    try {
      const isLogout = await diContainer.cradle.jwtService.verifyLogout(token)

      if (isLogout) {
        throw unauthorizedError('token 已过期')
      }

      const payload = await diContainer.cradle.jwtService.verify(token)

      const em = useEM()
      const user = await em.findOne(SysUserEntity,
        {
          id: { $eq: payload.sub },
        },
      )

      if (!user) {
        throw unauthorizedError('用户不存在')
      }

      event.context.currentUser = user
    }
    catch (error) {
      throw unauthorizedError(error.message)
    }
  }
}
