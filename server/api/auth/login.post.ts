export default defineEventHandler(async (event) => {
  const res = await readValidatedBody(event, LoginDto.safeParse)

  const params = diContainer.cradle.validateService.parseResult(res)

  return await diContainer.cradle.authHandler.login(params)
})
