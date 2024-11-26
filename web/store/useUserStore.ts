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

    async function logout() {}

    return {
      user,
      token,
      login,
      logout,
    }
  },
  {
    persist: {
      pick: ['token'],
    },
  })
