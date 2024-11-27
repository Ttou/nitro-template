export const userApi = {
  findPage(params: FindUserPageDtoType) {
    return $fetch('/api/system/user/findPage', { method: 'POST', body: params })
  },
}
