import { LoginDtoType } from '~/container/dtos/auth'

export const useUserStore = defineStore(
  'user',
  () => {
    const user = ref()
    const token = ref('')

    async function login(data: LoginDtoType) {
      const result = await authApi.login(data)

      token.value = result
    }

    async function logout() {
      await authApi.logout()

      await clear()
    }

    async function clear() {
      token.value = ''
    }

    return {
      user,
      token,
      login,
      logout,
      clear,
    }
  },
  {
    persist: {
      pick: ['token'],
    },
  })
