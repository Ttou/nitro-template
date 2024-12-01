export const postApi = {
  create(params: CreateDictDataDtoType) {
    return $fetch('/api/system/post/create', { method: 'POST', body: params })
  },
  update(params: UpdateDictDataDtoType) {
    return $fetch('/api/system/post/update', { method: 'POST', body: params })
  },
  remove(params: RemoveDtoType) {
    return $fetch('/api/system/post/remove', { method: 'DELETE', body: params })
  },
  findList(params: FindDictDataListDtoType) {
    return $fetch('/api/system/post/findList', { method: 'POST', body: params })
  },
}
