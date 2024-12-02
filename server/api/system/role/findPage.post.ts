export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, FindRolePageDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)

  return await diContainer.cradle.roleRepository.findPage(params)
})
