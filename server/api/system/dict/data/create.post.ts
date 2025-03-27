export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, CreateSystemDictDataDto.safeParse)
  const dto = parseValidateResult(result)

  const em = useEM()

  const { dictValue } = dto

  const oldRecord = await em.findOne(SysDictDataEntity,
    {
      dictValue: { $eq: dictValue },
    },
  )

  if (oldRecord) {
    throw badRequest(`字典值 ${dto.dictValue} 已存在`)
  }

  const config = em.create(SysDictDataEntity, dto)

  await em.persist(config).flush()

  return null
})
