export default defineEventHandler({
  onRequest: [AuthenticationGuard(), AuthorizationGuard('sys.menu.system.dept.create')],
  handler: async (event) => {
    const result = await readValidatedBody(event, CreateSystemDeptDto.safeParse)
    const dto = parseValidateResult(result)

    const em = useEM()

    const { deptKey } = dto

    const oldRecord = await em.findOne(SysDeptEntity,
      {
        deptKey: { $eq: deptKey },
      },
    )

    if (oldRecord) {
      throw badRequest(`部门标识 ${deptKey} 已存在`)
    }

    const newRecord = em.create(SysDeptEntity, dto)

    await em.persist(newRecord).flush()

    return null
  },
})
