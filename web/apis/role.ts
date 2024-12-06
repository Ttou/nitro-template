export const roleApi = {
  create(params: CreateSysRoleDtoType) {
    return $fetch('/api/system/role/create', { method: 'POST', body: params })
  },
  update(params: UpdateSysRoleDtoType) {
    return $fetch('/api/system/role/update', { method: 'POST', body: params })
  },
  remove(params: RemoveDtoType) {
    return $fetch('/api/system/role/remove', { method: 'DELETE', body: params })
  },
  findPage(params: FindSysRolePageDtoType) {
    return $fetch('/api/system/role/findPage', { method: 'POST', body: params })
  },
}
