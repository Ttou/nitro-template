export default defineEventHandler({
  onRequest: [useAuthentication(), useAuthorization('sys.menu.system.dictType.create')],
  handler: async (event) => {
    const result = await readValidatedBody(event, CreateSystemDictTypeDto.safeParse)
    const dto = parseValidateResult(result)

    const em = useEM()

    const { dictType } = dto

    const oldRecord = await em.findOne(SysDictTypeEntity,
      {
        dictType: { $eq: dictType },
      },
    )

    if (oldRecord) {
      throw badRequest(`字典类型 ${dictType} 已存在`)
    }

    const config = em.create(SysDictTypeEntity, dto)

    await em.persist(config).flush()

    return null
  },
})
