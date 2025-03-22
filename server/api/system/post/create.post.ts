export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, CreateSystemPostDto.safeParse)
  const dto = parseValidateResult(result)

  const em = useEM()

  const { postKey } = dto

  const oldRecord = await em.findOne<ISysPostEntity>(sysPostEntity.name,
    {
      postKey: { $eq: postKey },
    },
  )

  if (oldRecord) {
    throw badRequest(`岗位标识 ${postKey} 已存在`)
  }

  const newRecord = em.create<ISysPostEntity>(sysPostEntity.name, dto)

  await em.persist(newRecord).flush()

  return null
})
