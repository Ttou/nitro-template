export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, CreateSystemDictTypeDto.safeParse)
  const dto = parseValidateResult(result)

  const em = useEM()

  const { dictType } = dto

  const oldRecord = await em.findOne<ISysDictTypeEntity>(sysDictTypeEntity.name,
    {
      dictType: { $eq: dictType },
    },
  )

  if (oldRecord) {
    throw badRequest(`字典类型 ${dictType} 已存在`)
  }

  const config = em.create<ISysDictTypeEntity>(sysDictTypeEntity.name, dto)

  await em.persist(config).flush()

  return null
})
