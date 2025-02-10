export const userApi = {
  create(params: ICreateSystemUserDto) {
    return $fetch('/api/system/user/create', { method: 'POST', body: params })
  },
  update(params: IUpdateSystemUserDto) {
    return $fetch('/api/system/user/update', { method: 'POST', body: params })
  },
  remove(params: IRemoveDto) {
    return $fetch('/api/system/user/remove', { method: 'DELETE', body: params })
  },
  findPage(params: IFindSystemUserPageDto) {
    return $fetch('/api/system/user/findPage', { method: 'POST', body: params })
  },
}
