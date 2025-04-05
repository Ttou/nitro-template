export const monitorOnlineApi = {
  remove(params: IRemoveDto) {
    return $fetch('/api/monitor/online/remove', { method: 'DELETE', body: params })
  },
  findPage(params: IFindMonitorOnlinePageDto) {
    return $fetch('/api/monitor/online/findPage', { method: 'POST', body: params })
  },
}
