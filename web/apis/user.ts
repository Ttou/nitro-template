export const userApi = {
  findPage(params: FindSysUserPageDtoType) {
    return $fetch('/api/system/user/findPage', { method: 'POST', body: params })
  },
}
