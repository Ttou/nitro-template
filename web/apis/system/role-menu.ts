export const systemRoleMenuApi = {
  assign(params: IAssignMenuForRoleDto) {
    return $fetch('/api/system/role/menu/assign', { method: 'POST', body: params })
  },
  assigned(params: IFindAssignedMenuForRoleDto) {
    return $fetch('/api/system/role/menu/assigned', { method: 'POST', body: params })
  },
}
