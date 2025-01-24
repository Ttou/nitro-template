// 权限鉴权
export default defineEventHandler(async (event) => {
  const permission = PermissionConstant[event.path]

  if (permission) {
    const { currentUser, ormService } = event.context.scope.cradle

    const user = await ormService.em.fork().findOne<SysUserEntityType>(SysUserEntityName, {
      $and: [
        { id: { $eq: currentUser.id }},
        { roles: { menus: { menuKey: { $eq: permission } } } }
      ]
    })

    if (!user) {
      throw forbiddenError('没有权限访问')
    }
  }
})
