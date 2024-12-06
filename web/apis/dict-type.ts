export const dictTypeApi = {
  create(params: CreateSysDictTypeDtoType) {
    return $fetch('/api/system/dict/type/create', { method: 'POST', body: params })
  },
  update(params: UpdateSysDictTypeDtoType) {
    return $fetch('/api/system/dict/type/update', { method: 'POST', body: params })
  },
  remove(params: RemoveDtoType) {
    return $fetch('/api/system/dict/type/remove', { method: 'DELETE', body: params })
  },
  findPage(params: FindSysDictTypePageDtoType) {
    return $fetch('/api/system/dict/type/findPage', { method: 'POST', body: params })
  },
}
