export default defineEventHandler(async (event) => {
  const result = await getValidatedQuery(event, FindUserByIdDto.safeParse)

  const query = diContainer.cradle.validateService.parseResult(result)
  const user = await diContainer.cradle.userRepository.findById(query.id)

  return user
})
