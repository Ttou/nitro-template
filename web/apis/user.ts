export const userApi = {
  create(params: CreateSystemUserDtoType) {
    return $fetch('/api/system/user/create', { method: 'POST', body: params })
  },
  update(params: UpdateSystemUserDtoType) {
    return $fetch('/api/system/user/update', { method: 'POST', body: params })
  },
  remove(params: RemoveDtoType) {
    return $fetch('/api/system/user/remove', { method: 'DELETE', body: params })
  },
  findPage(params: FindSystemUserPageDtoType) {
    return $fetch('/api/system/user/findPage', { method: 'POST', body: params })
  },
}
