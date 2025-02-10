export const currentUserApi = {
  updatePassword(data: IUpdateCurrentUserPasswordDto) {
    return $fetch('/api/current-user/update-password', { method: 'POST', body: data })
  },
}
