export default defineEventHandler(async (event) => {
  const { currentUser } = event.context
  const em = useEM()

  const user = await em.findOne<ISysUserEntity, ISysUserEntityRelationKeys>(sysUserEntity.name,
    {
      userName: { $eq: currentUser.userName },
    },
    {
      populate: ['roles.menus'],
    },
  )

  return user
})
