export const roleMenuApi = {
  assign(params: IAssignMenuDto) {
    return $fetch('/api/system/role/menu/assign', { method: 'POST', body: params })
  },
  assigned(params: IFindAssignedMenuDto) {
    return $fetch('/api/system/role/menu/assigned', { method: 'POST', body: params })
  },
}
