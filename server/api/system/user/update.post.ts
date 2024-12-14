export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, UpdateSysUserDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)

  await diContainer.cradle.sysUserRepository.update(params)

  return null
})
