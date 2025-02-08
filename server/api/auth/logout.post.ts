export default defineEventHandler(async (event) => {
  const token = getTokenFormEvent(event)

  await diContainer.cradle.jwtService.addToBlacklist(token)

  return null
})
