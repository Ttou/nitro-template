export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, CreateSystemUserDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)

  await diContainer.cradle.sysUserRepository.create(params)

  return null
})
