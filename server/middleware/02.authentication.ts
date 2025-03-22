// 登录鉴权
export default defineEventHandler(async (event) => {
  if (isPrivatePath(event)) {
    const token = useToken()

    try {
      const isLogout = await jwtService.verifyLogout(token)

      if (isLogout) {
        throw unauthorizedError('token 已过期')
      }

      const payload = await jwtService.verify(token)

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
})
