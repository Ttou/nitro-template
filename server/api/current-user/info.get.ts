export default defineEventHandler({
  onRequest: [AuthenticationGuard()],
  handler: async (event) => {
    const { currentUser } = event.context
    const em = useEM()

    const user = await em.findOne(SysUserEntity,
      {
        userName: { $eq: currentUser.userName },
      },
      {
        populate: ['roles.menus'],
      },
    )

    return user
  },
})
