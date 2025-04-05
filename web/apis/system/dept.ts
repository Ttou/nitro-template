export const systemDeptApi = {
  findList(params: IFindSystemDeptListDto) {
    return $fetch('/api/system/dept/findList', { method: 'POST', body: params })
  },
  create(params: ICreateSystemDeptDto) {
    return $fetch('/api/system/dept/create', { method: 'POST', body: params })
  },
  update(params: IUpdateSystemDeptDto) {
    return $fetch('/api/system/dept/update', { method: 'POST', body: params })
  },
  remove(params: IRemoveDto) {
    return $fetch('/api/system/dept/remove', { method: 'DELETE', body: params })
  },
}
