export default defineEventHandler({
  onRequest: [AuthenticationGuard(), AuthorizationGuard('sys.menu.system.postAuth.unallocateUser')],
  handler: async (event) => {
    const result = await readValidatedBody(event, UnallocateUserForPostDto.safeParse)
    const dto = parseValidateResult(result)

    const em = useEM()

    const { id, ids } = dto

    const users = await em.find(SysUserEntity,
      {
        id: { $in: ids },
      },
      { populate: ['posts'] },
    )

    for (const user of users) {
      user.posts.remove(item => item.id === id)
    }

    await em.persist(users).flush()

    return null
  },
})
