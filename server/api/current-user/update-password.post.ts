export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, UpdateCurrentUserPasswordDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)
  const { currentUser } = event.context.scope.cradle

  await diContainer.cradle.currentUserHandler.updatePassword(params, currentUser)

  return null
})
