export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, UnallocateUserDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)

  return await diContainer.cradle.sysRoleRepository.unallocateUser(params)
})
