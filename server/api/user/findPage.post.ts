export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, FindUserPageDto.safeParse)

  const data = diContainer.cradle.validateService.parseResult(result)

  return await diContainer.cradle.userRepository.findPage(data)
})
