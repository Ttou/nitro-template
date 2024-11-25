import { ElMessage } from 'element-plus'
import { ofetch } from 'ofetch'

export const ajax = ofetch.create({
  baseURL: '/api',
  onRequest: ({ options }) => {
    const userStore = useUserStore()

    if (userStore.token) {
      options.headers.set('authorization', `Bearer ${userStore.token}`)
    }
  },
  async onRequestError({ request, options, error }) {
    console.log('[fetch request error]', request, error)
  },
  async onResponse({ request, response, options }) {
    console.log('[fetch response]', request, response.status, response.body)

    if (response.status !== 200) {
      ElMessage.error(response._data.message)
    }
  },
})
