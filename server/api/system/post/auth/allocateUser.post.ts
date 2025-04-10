export default defineEventHandler({
  onRequest: [useAuthentication(), useAuthorization('sys.menu.system.postAuth.allocateUser')],
  handler: async (event) => {
    const result = await readValidatedBody(event, AllocateUserForPostDto.safeParse)
    const dto = parseValidateResult(result)

    const em = useEM()

    const { id, ids } = dto

    const post = await em.findOne(SysPostEntity,
      {
        id: { $eq: id },
      },
    )
    const users = await em.find(SysUserEntity,
      {
        id: { $in: ids },
      },
      { populate: ['posts'] },
    )

    for (const user of users) {
      user.posts.add(post)
    }

    await em.persist(users).flush()

    return null
  },
})
