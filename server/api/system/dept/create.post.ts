export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, CreateSystemDeptDto.safeParse)
  const dto = parseValidateResult(result)

  const { ormService } = event.context.scope.cradle
  const em = ormService.em.fork()

  const { deptKey } = dto

  const oldRecord = await em.findOne<SysDeptEntityType>(SysDeptEntityName,
    {
      deptKey: { $eq: deptKey },
    },
  )

  if (oldRecord) {
    throw badRequest(`部门标识 ${deptKey} 已存在`)
  }

  const newRecord = em.create<SysDeptEntityType>(SysDeptEntityName, dto)

  await em.persist(newRecord).flush()

  return null
})
