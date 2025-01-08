export default defineEventHandler(async (event) => {
  const token = getTokenFormEvent(event)

  await diContainer.cradle.authHandler.logout(token)

  return null
})
