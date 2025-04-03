export default defineEventHandler({
  onRequest: [AuthenticationGuard(), AuthorizationGuard('sys.menu.system.role.findPage')],
  handler: async (event) => {
    const result = await readValidatedBody(event, FindSystemRolePageDto.safeParse)
    const dto = parseValidateResult(result)

    const em = useEM()

    const { page, pageSize, ...rest } = dto

    const [data, total] = await em.findAndCount(SysRoleEntity,
      {
        $and: [
          { roleName: rest.roleName ? { $like: `%${rest.roleName}%` } : {} },
          { roleKey: rest.roleKey ? { $like: `%${rest.roleKey}%` } : {} },
          { isAvailable: rest.isAvailable ? { $eq: rest.isAvailable } : {} },
          { createdAt: rest.beginTime ? { $gte: rest.beginTime, $lte: rest.endTime } : {} },
        ],
      },
      { limit: pageSize, offset: page - 1 },
    )

    return { page, pageSize, data, total }
  },
})
