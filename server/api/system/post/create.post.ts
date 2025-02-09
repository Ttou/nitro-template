export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, CreateSystemPostDto.safeParse)
  const dto = parseValidateResult(result)

  const { ormService } = event.context.scope.cradle
  const em = ormService.em.fork()

  const { postKey } = dto

  const oldRecord = await em.findOne<SysPostEntityType>(SysPostEntityName,
    {
      postKey: { $eq: postKey },
    },
  )

  if (oldRecord) {
    throw badRequest(`岗位标识 ${postKey} 已存在`)
  }

  const newRecord = em.create<SysPostEntityType>(SysPostEntityName, dto)

  await em.persist(newRecord).flush()

  return null
})
