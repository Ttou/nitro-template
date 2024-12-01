export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, FindPostListDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)

  return await diContainer.cradle.postRepository.findList(params)
})
