export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, CreateSystemConfigDto.safeParse)
  const dto = parseValidateResult(result)

  const em = useEM()

  const { configKey } = dto

  const oldRecord = await em.findOne<ISysConfigEntity>(sysConfigEntity.name,
    {
      configKey: { $eq: dto.configKey },
    },
  )

  if (oldRecord) {
    throw badRequest(`配置标识 ${configKey} 已存在`)
  }

  const config = em.create<ISysConfigEntity>(sysConfigEntity.name, dto)

  await em.persist(config).flush()

  return null
})
