export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, UpdatePostDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)

  await diContainer.cradle.postRepository.update(params)

  return null
})
