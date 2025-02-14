export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, CreateSystemDictDataDto.safeParse)
  const dto = parseValidateResult(result)

  const { ormService } = event.context.scope.cradle
  const em = ormService.em.fork()

  const { dictValue } = dto

  const oldRecord = await em.findOne<ISysDictDataEntity>(EntityNameEnum.SysDictData,
    {
      dictValue: { $eq: dictValue },
    },
  )

  if (oldRecord) {
    throw badRequest(`字典值 ${dto.dictValue} 已存在`)
  }

  const config = em.create<ISysDictDataEntity>(EntityNameEnum.SysDictData, dto)

  await em.persist(config).flush()

  return null
})
