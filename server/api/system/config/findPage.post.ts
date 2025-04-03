export default defineEventHandler({
  onRequest: [AuthenticationGuard(), AuthorizationGuard('sys.menu.system.config.findPage')],
  handler: async (event) => {
    const result = await readValidatedBody(event, FindSystemConfigPageDto.safeParse)
    const dto = parseValidateResult(result)

    const em = useEM()

    const { page, pageSize, ...rest } = dto

    const [data, total] = await em.findAndCount(SysConfigEntity,
      {
        $and: [
          { configName: rest.configName ? { $like: `%${rest.configName}%` } : {} },
          { configKey: rest.configKey ? { $like: `%${rest.configKey}%` } : {} },
          { isBuiltin: rest.isBuiltin ? { $eq: rest.isBuiltin } : {} },
          { createdAt: rest.beginTime ? { $gte: rest.beginTime, $lte: rest.endTime } : {} },
        ],
      },
      { limit: pageSize, offset: page - 1 },
    )

    return { page, pageSize, data, total }
  },
})
