defineRouteMeta({
  openAPI: {
    tags: ['用户接口'],
    summary: '通过id查询用户信息',
    parameters: [{ in: 'query', name: 'id', required: true }],
  },
})

export default defineEventHandler(async (event) => {
  const { em } = await useOrm()
  const { parseResult } = useValidate()
  const result = await getValidatedQuery(event, FindUserByIdDto.safeParse)

  const query = parseResult(result)
  const user = await em.fork().findOne<UserEntityType>(UserEntityName, { id: query.id })

  return user
})
