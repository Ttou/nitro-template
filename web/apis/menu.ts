export const menuApi = {
  findList(params: IFindSystemMenuListDto) {
    return $fetch('/api/system/menu/findList', { method: 'POST', body: params })
  },
  create(params: ICreateSystemMenuDto) {
    return $fetch('/api/system/menu/create', { method: 'POST', body: params })
  },
  update(params: IUpdateSystemMenuDto) {
    return $fetch('/api/system/menu/update', { method: 'POST', body: params })
  },
  remove(params: IRemoveDto) {
    return $fetch('/api/system/menu/remove', { method: 'DELETE', body: params })
  },
}
