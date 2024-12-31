export default defineEventHandler(async (event) => {
  const token = getTokenFormEvent(event)
  const { jwtService } = event.context.scope.cradle

  await jwtService.addToBlacklist(token)

  return null
})
