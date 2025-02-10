export const dictTypeApi = {
  create(params: ICreateSystemDictTypeDto) {
    return $fetch('/api/system/dict/type/create', { method: 'POST', body: params })
  },
  update(params: IUpdateSystemDictTypeDto) {
    return $fetch('/api/system/dict/type/update', { method: 'POST', body: params })
  },
  remove(params: IRemoveDto) {
    return $fetch('/api/system/dict/type/remove', { method: 'DELETE', body: params })
  },
  findPage(params: IFindSystemDictTypePageDto) {
    return $fetch('/api/system/dict/type/findPage', { method: 'POST', body: params })
  },
}
