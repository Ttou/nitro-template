export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, CreateSystemDeptDto.safeParse)
  const dto = parseValidateResult(result)

  const em = useEM()

  const { deptKey } = dto

  const oldRecord = await em.findOne<ISysDeptEntity>(sysDeptEntity.name,
    {
      deptKey: { $eq: deptKey },
    },
  )

  if (oldRecord) {
    throw badRequest(`部门标识 ${deptKey} 已存在`)
  }

  const newRecord = em.create<ISysDeptEntity>(sysDeptEntity.name, dto)

  await em.persist(newRecord).flush()

  return null
})
