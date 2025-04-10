export default defineEventHandler({
  onRequest: [useAuthentication()],
  handler: async (event) => {
    const em = useEM()

    const result = await em.findOne(SysUserEntity,
      {
        id: { $eq: event.context.currentUser.id },
      },
      { exclude: ['password'] },
    )

    return result
  },
})
