export function AuthorizationGuard(permission: string) {
  return async function () {
    const event = useEvent()
    const em = useEM()

    const user = await em.findOne(SysUserEntity,
      {
        $and: [
          { id: { $eq: event.context.currentUser.id } },
          { roles: { menus: { menuKey: { $eq: permission } } } },
        ],
      },
    )

    if (!user) {
      throw forbiddenError('没有权限访问')
    }
  }
}
