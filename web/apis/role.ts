export const roleApi = {
  create(params: CreateRoleDtoType) {
    return $fetch('/api/system/role/create', { method: 'POST', body: params })
  },
  update(params: UpdateRoleDtoType) {
    return $fetch('/api/system/role/update', { method: 'POST', body: params })
  },
  remove(params: RemoveDtoType) {
    return $fetch('/api/system/role/remove', { method: 'DELETE', body: params })
  },
  findPage(params: FindRolePageDtoType) {
    return $fetch('/api/system/role/findPage', { method: 'POST', body: params })
  },
}
