// 保留文件，用来重写 openAPI 文档

defineRouteMeta({
  openAPI: {
    tags: ['Internal'],
    summary: '中间件，不用理会',
    deprecated: true,
  },
})

export default defineEventHandler(() => {})
