defineRouteMeta({
  openAPI: {
    tags: ['用户接口'],
    summary: '通过id查询用户信息',
    parameters: [{ in: 'query', name: 'id', required: true }],
  },
})

export default defineEventHandler(async (event) => {
  const { parseResult } = useValidate()
  const result = await getValidatedQuery(event, FindUserByIdDto.safeParse)

  const query = parseResult(result)
  const { findById } = await useUserModel()
  const user = await findById(query.id)

  return user
})
