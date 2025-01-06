export const menuApi = {
  findList(params: FindSystemMenuListDtoType) {
    return $fetch('/api/system/menu/findList', { method: 'POST', body: params })
  },
  create(params: CreateSystemMenuDtoType) {
    return $fetch('/api/system/menu/create', { method: 'POST', body: params })
  },
  update(params: UpdateSystemMenuDtoType) {
    return $fetch('/api/system/menu/update', { method: 'POST', body: params })
  },
  remove(params: RemoveDtoType) {
    return $fetch('/api/system/menu/remove', { method: 'DELETE', body: params })
  },
}
