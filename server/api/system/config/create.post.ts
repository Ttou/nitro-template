export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, CreateSystemConfigDto.safeParse)
  const dto = parseValidateResult(result)

  const { ormService } = event.context.scope.cradle
  const em = ormService.em.fork()

  const { configKey } = dto

  const oldRecord = await em.findOne<SysConfigEntityType>(SysConfigEntityName,
    {
      configKey: { $eq: dto.configKey },
    },
  )

  if (oldRecord) {
    throw badRequest(`配置标识 ${configKey} 已存在`)
  }

  const config = em.create<SysConfigEntityType>(SysConfigEntityName, dto)

  await em.persist(config).flush()

  return null
})
