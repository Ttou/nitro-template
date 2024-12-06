export const dictDataApi = {
  create(params: CreateSysDictDataDtoType) {
    return $fetch('/api/system/dict/data/create', { method: 'POST', body: params })
  },
  update(params: UpdateSysDictDataDtoType) {
    return $fetch('/api/system/dict/data/update', { method: 'POST', body: params })
  },
  remove(params: RemoveDtoType) {
    return $fetch('/api/system/dict/data/remove', { method: 'DELETE', body: params })
  },
  findList(params: FindSysDictDataListDtoType) {
    return $fetch('/api/system/dict/data/findList', { method: 'POST', body: params })
  },
}
