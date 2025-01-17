// 权限鉴权
export default defineEventHandler(async (event) => {
  const permission = PermissionConstant[event.path]

  if (permission) {
    // TODO 获取当前用户权限列表
    const { currentUser } = event.context.scope.cradle
  }
})
