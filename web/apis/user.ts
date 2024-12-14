export const userApi = {
  create(params: CreateSysUserDtoType) {
    return $fetch('/api/system/user/create', { method: 'POST', body: params })
  },
  update(params: UpdateSysUserDtoType) {
    return $fetch('/api/system/user/update', { method: 'POST', body: params })
  },
  remove(params: RemoveDtoType) {
    return $fetch('/api/system/user/remove', { method: 'DELETE', body: params })
  },
  findPage(params: FindSysUserPageDtoType) {
    return $fetch('/api/system/user/findPage', { method: 'POST', body: params })
  },
}
