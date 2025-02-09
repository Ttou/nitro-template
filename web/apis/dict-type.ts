export const dictTypeApi = {
  create(params: CreateSystemDictTypeDtoType) {
    return $fetch('/api/system/dict/type/create', { method: 'POST', body: params })
  },
  update(params: UpdateSystemDictTypeDtoType) {
    return $fetch('/api/system/dict/type/update', { method: 'POST', body: params })
  },
  remove(params: IRemoveDto) {
    return $fetch('/api/system/dict/type/remove', { method: 'DELETE', body: params })
  },
  findPage(params: FindSystemDictTypePageDtoType) {
    return $fetch('/api/system/dict/type/findPage', { method: 'POST', body: params })
  },
}
