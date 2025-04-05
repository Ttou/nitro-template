export const systemDictDataApi = {
  create(params: ICreateSystemDictDataDto) {
    return $fetch('/api/system/dict/data/create', { method: 'POST', body: params })
  },
  update(params: IUpdateSystemDictDataDto) {
    return $fetch('/api/system/dict/data/update', { method: 'POST', body: params })
  },
  remove(params: IRemoveDto) {
    return $fetch('/api/system/dict/data/remove', { method: 'DELETE', body: params })
  },
  findList(params: IFindSystemDictDataListDto) {
    return $fetch('/api/system/dict/data/findList', { method: 'POST', body: params })
  },
}
