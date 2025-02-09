export const configApi = {
  create(params: CreateSystemConfigDtoType) {
    return $fetch('/api/system/config/create', { method: 'POST', body: params })
  },
  update(params: UpdateSystemConfigDtoType) {
    return $fetch('/api/system/config/update', { method: 'POST', body: params })
  },
  remove(params: IRemoveDto) {
    return $fetch('/api/system/config/remove', { method: 'DELETE', body: params })
  },
  findPage(params: FindSystemConfigPageDtoType) {
    return $fetch('/api/system/config/findPage', { method: 'POST', body: params })
  },
}
