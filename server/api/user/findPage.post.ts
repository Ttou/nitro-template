export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, FindUserPageDto.safeParse)

  const data = diContainer.cradle.validateService.parseResult(result)

  const [list, total] = await diContainer.cradle.userRepository.findPage(data)

  return {
    page: data.page,
    size: data.size,
    total,
    list,
  }
})
