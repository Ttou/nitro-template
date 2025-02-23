export default defineEventHandler(async (event) => {
  const { currentUser } = event.context.scope.cradle
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
})
