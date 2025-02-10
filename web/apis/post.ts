export const postApi = {
  create(params: ICreateSystemPostDto) {
    return $fetch('/api/system/post/create', { method: 'POST', body: params })
  },
  update(params: IUpdateSystemPostDto) {
    return $fetch('/api/system/post/update', { method: 'POST', body: params })
  },
  remove(params: IRemoveDto) {
    return $fetch('/api/system/post/remove', { method: 'DELETE', body: params })
  },
  findPage(params: IFindSystemPostPageDto) {
    return $fetch('/api/system/post/findPage', { method: 'POST', body: params })
  },
}
