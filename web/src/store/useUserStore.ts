import { LoginDtoType } from '~/container/dtos/auth'

export const useUserStore = defineStore(
  'user',
  () => {
    const user = ref()
    const token = ref('')

    async function login(data: LoginDtoType) {
      const res = await authApi.login(data)

      token.value = res.data
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
