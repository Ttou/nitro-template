export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, CreatePostDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)

  await diContainer.cradle.postRepository.create(params)

  return null
})
