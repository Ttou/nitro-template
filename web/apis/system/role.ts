export const systemRoleApi = {
  create(params: ICreateSystemRoleDto) {
    return $fetch('/api/system/role/create', { method: 'POST', body: params })
  },
  update(params: IUpdateSystemRoleDto) {
    return $fetch('/api/system/role/update', { method: 'POST', body: params })
  },
  remove(params: IRemoveDto) {
    return $fetch('/api/system/role/remove', { method: 'DELETE', body: params })
  },
  findPage(params: IFindSystemRolePageDto) {
    return $fetch('/api/system/role/findPage', { method: 'POST', body: params })
  },
}
