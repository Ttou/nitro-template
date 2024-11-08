defineRouteMeta({
  openAPI: {
    tags: ['鉴权接口'],
    summary: '登录',
  },
})

export default defineEventHandler(async (event) => {
  const { parseResult } = useValidate()
  const res = await readValidatedBody(event, LoginDto.safeParse)

  const data = parseResult(res)

  return {}
})
