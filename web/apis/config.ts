export const configApi = {
  create(params: CreateConfigDtoType) {
    return $fetch('/api/system/config/create', { method: 'POST', body: params })
  },
  update(params: UpdateConfigDtoType) {
    return $fetch('/api/system/config/update', { method: 'POST', body: params })
  },
  remove(params: RemoveDtoType) {
    return $fetch('/api/system/config/remove', { method: 'DELETE', body: params })
  },
  findPage(params: FindConfigPageDtoType) {
    return $fetch('/api/system/config/findPage', { method: 'POST', body: params })
  },
}
