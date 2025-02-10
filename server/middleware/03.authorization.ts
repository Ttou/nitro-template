// 权限鉴权
export default defineEventHandler(async (event) => {
  if (isPrivatePath(event)) {
    const permission = PermissionConstant[event.path]
    const { currentUser, ormService } = event.context.scope.cradle

    if (!isAdmin(currentUser) && permission) {
      const user = await ormService.em.fork().findOne<ISysUserEntity>(SysUserEntityName,
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
