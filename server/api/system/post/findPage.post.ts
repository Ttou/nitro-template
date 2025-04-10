export default defineEventHandler({
  onRequest: [useAuthentication(), useAuthorization('sys.menu.system.post.findPage')],
  handler: async (event) => {
    const result = await readValidatedBody(event, FindSystemPostPageDto.safeParse)
    const dto = parseValidateResult(result)

    const em = useEM()

    const { page, pageSize, ...rest } = dto

    const [data, total] = await em.findAndCount(SysPostEntity,
      {
        $and: [
          { postName: rest.postName ? { $like: `%${rest.postName}%` } : {} },
          { postKey: rest.postKey ? { $like: `%${rest.postKey}%` } : {} },
          { isAvailable: rest.isAvailable ? { $eq: rest.isAvailable } : {} },
          { createdAt: rest.beginTime ? { $gte: rest.beginTime, $lte: rest.endTime } : {} },
        ],
      },
      { limit: pageSize, offset: page - 1 },
    )

    return { page, pageSize, data, total }
  },
})
