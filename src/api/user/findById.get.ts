defineRouteMeta({
  openAPI: {
    tags: ['用户接口'],
    summary: '通过id查询用户信息',
    parameters: [{ in: 'query', name: 'id', required: true }],
  },
})

export default defineEventHandler(async (event) => {
  const result = await getValidatedQuery(event, FindUserByIdDto.safeParse)

  const query = diContainer.cradle.validateService.parseResult(result)
  const user = await diContainer.cradle.userRepository.findById(query.id)

  return user
})
