export const roleApi = {
  create(params: CreateSystemRoleDtoType) {
    return $fetch('/api/system/role/create', { method: 'POST', body: params })
  },
  update(params: UpdateSystemRoleDtoType) {
    return $fetch('/api/system/role/update', { method: 'POST', body: params })
  },
  remove(params: IRemoveDto) {
    return $fetch('/api/system/role/remove', { method: 'DELETE', body: params })
  },
  findPage(params: FindSystemRolePageDtoType) {
    return $fetch('/api/system/role/findPage', { method: 'POST', body: params })
  },
}
