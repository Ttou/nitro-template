export default defineEventHandler({
  onRequest: [useAuthentication(), useAuthorization('sys.menu.system.dictType.findPage')],
  handler: async (event) => {
    const result = await readValidatedBody(event, FindSystemDictTypePageDto.safeParse)
    const dto = parseValidateResult(result)

    const em = useEM()

    const { page, pageSize, ...rest } = dto

    const [data, total] = await em.findAndCount(SysDictTypeEntity,
      {
        $and: [
          { dictName: rest.dictName ? { $like: `%${rest.dictName}%` } : {} },
          { dictType: rest.dictType ? { $like: `%${rest.dictType}%` } : {} },
          { isAvailable: rest.isAvailable ? { $eq: rest.isAvailable } : {} },
          { createdAt: rest.beginTime ? { $gte: rest.beginTime, $lte: rest.endTime } : {} },
        ],
      },
      { limit: pageSize, offset: page - 1 },
    )

    return { page, pageSize, data, total }
  },
})
