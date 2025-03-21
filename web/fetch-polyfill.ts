import { ElMessage } from 'element-plus'
import { ofetch } from 'ofetch'

const $fetch = ofetch.create({
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
    console.log('[fetch response]', request, response.status, response._data)

    if (response.status !== httpStatusEnum.OK) {
      if (response.status === httpStatusEnum.UNAUTHORIZED) {
        const userStore = useUserStore()

        ElMessage.error({
          message: response._data.msg,
          onClose: () => {
            userStore.clear().then(() => {
              window.location.reload()
            })
          },
        })
      }
      else {
        ElMessage.error(response._data.msg)
      }
    }
    else {
      // 将data字段赋值给_data，方便后续使用
      response._data = response._data.data
    }
  },
})

// @ts-ignore
globalThis.$fetch = $fetch
