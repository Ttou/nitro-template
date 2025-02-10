export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, FindSystemConfigPageDto.safeParse)
  const dto = parseValidateResult(result)

  const { ormService } = event.context.scope.cradle
  const em = ormService.em.fork()

  const { page, pageSize, ...rest } = dto

  const [data, total] = await em.findAndCount<ISysConfigEntity>(SysConfigEntityName,
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
})
