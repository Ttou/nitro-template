export default defineEventHandler(async (event) => {
  const result = await getValidatedQuery(event, FindSystemUserByIdDto.safeParse)

  const query = diContainer.cradle.validateService.parseResult(result)
  const user = await diContainer.cradle.sysUserRepository.findById(query.id)

  return user
})
