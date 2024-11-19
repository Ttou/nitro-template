import { createFetch } from 'ofetch'

export const ajax = createFetch({
  defaults: {
    baseURL: '/api',
    onRequest: ({ options }) => {},
  },
})
