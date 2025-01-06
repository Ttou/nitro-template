export const postApi = {
  create(params: CreateSystemPostDtoType) {
    return $fetch('/api/system/post/create', { method: 'POST', body: params })
  },
  update(params: UpdateSystemPostDtoType) {
    return $fetch('/api/system/post/update', { method: 'POST', body: params })
  },
  remove(params: RemoveDtoType) {
    return $fetch('/api/system/post/remove', { method: 'DELETE', body: params })
  },
  findPage(params: FindSystemPostPageDtoType) {
    return $fetch('/api/system/post/findPage', { method: 'POST', body: params })
  },
}
