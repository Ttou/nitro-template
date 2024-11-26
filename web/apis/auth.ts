import { LoginDtoType } from '~/container/dtos/auth'

export const authApi = {
  login(data: LoginDtoType) {
    return $fetch('/api/auth/login', { method: 'POST', body: data })
  },
}
