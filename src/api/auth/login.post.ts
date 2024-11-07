defineRouteMeta({
  openAPI: {
    tags: ['Auth'],
    description: '登录接口',
    summary: '登录接口',
  },
})

export default defineEventHandler(async () => {
  const event = useEvent()
  const { parseResult } = useValidate()
  const res = await readValidatedBody(event, LoginSchema.safeParse)

  const data = parseResult<LoginSchemaType>(res)

  return {}
})
