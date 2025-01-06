export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, UpdateSystemPostDto.safeParse)
  const params = diContainer.cradle.validateService.parseResult(result)

  await diContainer.cradle.sysPostRepository.update(params)

  return null
})
