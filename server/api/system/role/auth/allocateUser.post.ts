export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, AllocateUserDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)

  return await diContainer.cradle.systemRoleHandler.allocateUser(params)
})
