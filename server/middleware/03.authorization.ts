// 权限鉴权
export default defineEventHandler(async (event) => {
  if (isPrivatePath(event)) {
    const permission = PermissionConstant[event.path]
    const { currentUser } = event.context.scope.cradle

    if (!isAdmin(currentUser) && permission) {
      const em = useEM()

      const user = await em.findOne(SysUserEntity,
        {
          $and: [
            { id: { $eq: currentUser.id } },
            { roles: { menus: { menuKey: { $eq: permission } } } },
          ],
        },
      )

      if (!user) {
        throw forbiddenError('没有权限访问')
      }
    }
  }
})
