export default defineEventHandler({
  onRequest: [useAuthentication(), useAuthorization('sys.menu.monitor.online.findPage')],
  handler: async (event) => {
    const result = await readValidatedBody(event, FindMonitorOnlinePageDto.safeParse)
    const dto = parseValidateResult(result)

    const em = useEM()

    const { page, pageSize, ...rest } = dto

    console.log(dto)

    const [data, total] = await em.findAndCount(SysOnlineEntity,
      {
        $and: [
          {
            user: {
              userName: rest.userName ? { $like: `%${rest.userName}%` } : {},
              nickName: rest.nickName ? { $like: `%${rest.nickName}%` } : {},
            },
            loginTime: rest.beginTime ? { $gte: rest.beginTime, $lte: rest.endTime } : {},
          },
        ],
      },
      { limit: pageSize, offset: page - 1, populate: ['user'], exclude: ['token'] },
    )

    return { page, pageSize, data, total }
  },
})
