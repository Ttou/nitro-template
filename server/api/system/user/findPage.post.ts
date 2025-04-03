export default defineEventHandler({
  onRequest: [AuthenticationGuard(), AuthorizationGuard('sys.menu.system.user.findPage')],
  handler: async (event) => {
    const result = await readValidatedBody(event, FindSystemUserPageDto.safeParse)
    const dto = parseValidateResult(result)

    const em = useEM()

    const { page, pageSize, ...rest } = dto

    const [data, total] = await em.findAndCount(SysUserEntity,
      {
        $and: [
          { userName: rest.userName ? { $like: `%${rest.userName}%` } : {} },
          { nickName: rest.nickName ? { $like: `%${rest.nickName}%` } : {} },
          { phone: rest.phone ? { $like: `%${rest.phone}%` } : {} },
          { email: rest.email ? { $like: `%${rest.email}%` } : {} },
          { sex: rest.sex ? { $eq: rest.sex } : {} },
          { isAvailable: rest.isAvailable ? { $eq: rest.isAvailable } : {} },
        ],
      },
      { limit: pageSize, offset: page - 1 },
    )

    return { page, pageSize, data, total }
  },
})
