export const postApi = {
  create(params: CreateSysPostDtoType) {
    return $fetch('/api/system/post/create', { method: 'POST', body: params })
  },
  update(params: UpdateSysPostDtoType) {
    return $fetch('/api/system/post/update', { method: 'POST', body: params })
  },
  remove(params: RemoveDtoType) {
    return $fetch('/api/system/post/remove', { method: 'DELETE', body: params })
  },
  findPage(params: FindSysPostPageDtoType) {
    return $fetch('/api/system/post/findPage', { method: 'POST', body: params })
  },
}
