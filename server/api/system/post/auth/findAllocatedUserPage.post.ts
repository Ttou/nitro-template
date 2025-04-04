export default defineEventHandler({
  onRequest: [AuthenticationGuard(), AuthorizationGuard('sys.menu.system.postAuth.findAllocatedUserPage')],
  handler: async (event) => {
    const result = await readValidatedBody(event, FindAllocatedUserPageForPostDto.safeParse)
    const dto = parseValidateResult(result)
    console.log(dto)

    const em = useEM()

    const { page, pageSize, ...rest } = dto

    const [data, total] = await em.findAndCount(SysUserEntity,
      {
        $and: [
          { userName: rest.userName ? { $like: `%${rest.userName}%` } : {} },
          { nickName: rest.nickName ? { $like: `%${rest.nickName}%` } : {} },
          { posts: { id: { $eq: rest.id } } },
        ],
      },
      { limit: pageSize, offset: page - 1, populate: ['posts'] },
    )

    return { page, pageSize, data, total }
  },
})
