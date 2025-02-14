export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, CreateSystemConfigDto.safeParse)
  const dto = parseValidateResult(result)

  const { ormService } = event.context.scope.cradle
  const em = ormService.em.fork()

  const { configKey } = dto

  const oldRecord = await em.findOne<ISysConfigEntity>(EntityNameEnum.SysConfig,
    {
      configKey: { $eq: dto.configKey },
    },
  )

  if (oldRecord) {
    throw badRequest(`配置标识 ${configKey} 已存在`)
  }

  const config = em.create<ISysConfigEntity>(EntityNameEnum.SysConfig, dto)

  await em.persist(config).flush()

  return null
})
