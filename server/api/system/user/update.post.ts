export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, UpdateSystemUserDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)

  await diContainer.cradle.systemUserHandler.update(params)

  return null
})
