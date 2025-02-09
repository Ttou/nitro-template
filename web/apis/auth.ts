export const authApi = {
  login(data: ILoginDto) {
    return $fetch('/api/auth/login', { method: 'POST', body: data })
  },
  logout() {
    return $fetch('/api/auth/logout', { method: 'POST' })
  },
}
