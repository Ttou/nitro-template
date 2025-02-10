export default defineEventHandler(async (event) => {
  const result = await getValidatedQuery(event, FindSystemConfigByKeyDto.safeParse)
  const dto = parseValidateResult(result)

  const { ormService } = event.context.scope.cradle
  const em = ormService.em.fork()

  const { configKey } = dto

  const oldRecord = await em.findOne<ISysConfigEntity>(SysConfigEntityName,
    {
      configKey: { $eq: configKey },
    },
  )

  if (!oldRecord) {
    throw badRequest(`配置标识 ${configKey} 不存在`)
  }

  return oldRecord
})
