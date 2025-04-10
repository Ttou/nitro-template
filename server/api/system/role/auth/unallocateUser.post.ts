export default defineEventHandler({
  onRequest: [useAuthentication(), useAuthorization('sys.menu.system.roleAuth.unallocateUser')],
  handler: async (event) => {
    const result = await readValidatedBody(event, UnallocateUserForRoleDto.safeParse)
    const dto = parseValidateResult(result)

    const em = useEM()

    const { id, ids } = dto

    const users = await em.find(SysUserEntity,
      {
        id: { $in: ids },
      },
      { populate: ['roles'] },
    )

    for (const user of users) {
      user.roles.remove(item => item.id === id)
    }

    await em.persist(users).flush()

    return null
  },
})
