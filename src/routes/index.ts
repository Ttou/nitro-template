defineRouteMeta({
  openAPI: {
    tags: ['Index'],
    description: '接口描述',
    summary: '接口概要',
  },
})

export default defineEventHandler(() => {
  return 'Nitro Server'
})
