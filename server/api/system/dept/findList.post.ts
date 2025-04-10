export default defineEventHandler({
  onRequest: [useAuthentication(), useAuthorization('sys.menu.system.dept.findList')],
  handler: async (event) => {
    const result = await readValidatedBody(event, FindSystemDeptListDto.safeParse)
    const dto = parseValidateResult(result)

    const em = useEM()

    const { deptName, deptKey, isAvailable } = dto

    const data = await em.findAll(SysDeptEntity,
      {
        where: {
          deptName: deptName ? { $like: `%${deptName}%` } : {},
          deptKey: deptKey ? { $like: `%${deptKey}%` } : {},
          isAvailable: isAvailable ? { $eq: isAvailable } : {},
        },
      },
    )

    return data
  },
})
