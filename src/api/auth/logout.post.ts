defineRouteMeta({
  openAPI: {
    tags: ['Auth'],
    description: '登出接口',
    summary: '登出接口',
  },
})

export default defineEventHandler(() => {
  const event = useEvent()

  return {}
})
