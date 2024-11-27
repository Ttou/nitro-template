export const configApi = {
  create(params: CreateConfigDtoType) {
    return $fetch('/api/system/config/create', { method: 'POST', body: params })
  },
  update(params: UpdateConfigDtoType) {
    return $fetch('/api/system/config/update', { method: 'POST', body: params })
  },
}
