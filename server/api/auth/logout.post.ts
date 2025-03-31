export default defineEventHandler(async (event) => {
  const token = useToken()

  await diContainer.cradle.jwtService.addToLogout(token)

  return null
})
