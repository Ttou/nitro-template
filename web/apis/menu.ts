export const menuApi = {
  findList(params: FindSysMenuListDtoType) {
    return $fetch('/api/system/menu/findList', { method: 'POST', body: params })
  },
  create(params: CreateSysMenuDtoType) {
    return $fetch('/api/system/menu/create', { method: 'POST', body: params })
  },
  update(params: UpdateSysMenuDtoType) {
    return $fetch('/api/system/menu/update', { method: 'POST', body: params })
  },
  remove(params: RemoveDtoType) {
    return $fetch('/api/system/menu/remove', { method: 'DELETE', body: params })
  },
}
