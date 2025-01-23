export const currentUserApi = {
  updatePassword(data: UpdateCurrentUserPasswordDtoType) {
    return $fetch('/api/current-user/update-password', { method: 'POST', body: data })
  },
}
