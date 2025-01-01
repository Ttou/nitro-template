export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, UpdateCurrentUserPasswordDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)

  const { currentUser: user } = event.context.scope.cradle

  const isMatch = await diContainer.cradle.hashService.compare(params.oldPassword, user.password)

  if (!isMatch) {
    throw badRequest('旧密码错误')
  }

  const password = await diContainer.cradle.hashService.hash(params.newPassword)

  await diContainer.cradle.sysUserRepository.update({
    id: user.id,
    userName: user.userName,
    password,
  })

  return null
})
