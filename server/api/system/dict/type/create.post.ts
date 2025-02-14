export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, CreateSystemDictTypeDto.safeParse)
  const dto = parseValidateResult(result)

  const { ormService } = event.context.scope.cradle
  const em = ormService.em.fork()

  const { dictType } = dto

  const oldRecord = await em.findOne<ISysDictTypeEntity>(EntityNameEnum.SysDictType,
    {
      dictType: { $eq: dictType },
    },
  )

  if (oldRecord) {
    throw badRequest(`字典类型 ${dictType} 已存在`)
  }

  const config = em.create<ISysDictTypeEntity>(EntityNameEnum.SysDictType, dto)

  await em.persist(config).flush()

  return null
})
