export default defineEventHandler({
  onRequest: [AuthenticationGuard(), AuthorizationGuard('sys.menu.system.roleAuth.allocateUser')],
  handler: async (event) => {
    const result = await readValidatedBody(event, AllocateUserForRoleDto.safeParse)
    const dto = parseValidateResult(result)

    const em = useEM()

    const { id, ids } = dto

    const role = await em.findOne(SysRoleEntity,
      {
        id: { $eq: id },
      },
    )
    const users = await em.find(SysUserEntity,
      {
        id: { $in: ids },
      },
      { populate: ['roles'] },
    )

    for (const user of users) {
      user.roles.add(role)
    }

    await em.persist(users).flush()

    return null
  },
})
