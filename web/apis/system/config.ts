export const systemConfigApi = {
  create(params: ICreateSystemConfigDto) {
    return $fetch('/api/system/config/create', { method: 'POST', body: params })
  },
  update(params: IUpdateSystemConfigDto) {
    return $fetch('/api/system/config/update', { method: 'POST', body: params })
  },
  remove(params: IRemoveDto) {
    return $fetch('/api/system/config/remove', { method: 'DELETE', body: params })
  },
  findPage(params: IFindSystemConfigPageDto) {
    return $fetch('/api/system/config/findPage', { method: 'POST', body: params })
  },
}
