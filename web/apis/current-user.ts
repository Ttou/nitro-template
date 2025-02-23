export const currentUserApi = {
  getInfo() {
    return $fetch('/api/current-user/info')
  },
  updatePassword(data: IUpdateCurrentUserPasswordDto) {
    return $fetch('/api/current-user/update-password', { method: 'POST', body: data })
  },
}
