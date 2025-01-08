export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, FindUnallocatedUserPageDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)

  return await diContainer.cradle.systemRoleHandler.findUnallocatedUserPage(params)
})
