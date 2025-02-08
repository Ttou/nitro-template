export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, FindSystemDeptListDto.safeParse)
  const dto = parseValidateResult(result)

  const { ormService } = event.context.scope.cradle
  const em = ormService.em.fork()

  const { deptName, deptKey, isAvailable } = dto

  const data = await em.findAll<SysDeptEntityType>(SysDeptEntityName,
    {
      where: {
        deptName: deptName ? { $like: `%${deptName}%` } : {},
        deptKey: deptKey ? { $like: `%${deptKey}%` } : {},
        isAvailable: isAvailable ? { $eq: isAvailable } : {},
      },
    },
  )

  return data
})
