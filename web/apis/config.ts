export const configApi = {
  create(params: CreateSysConfigDtoType) {
    return $fetch('/api/system/config/create', { method: 'POST', body: params })
  },
  update(params: UpdateSysConfigDtoType) {
    return $fetch('/api/system/config/update', { method: 'POST', body: params })
  },
  remove(params: RemoveDtoType) {
    return $fetch('/api/system/config/remove', { method: 'DELETE', body: params })
  },
  findPage(params: FindSysConfigPageDtoType) {
    return $fetch('/api/system/config/findPage', { method: 'POST', body: params })
  },
}
