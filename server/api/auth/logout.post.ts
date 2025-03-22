export default defineEventHandler(async (event) => {
  const token = useToken()

  await jwtService.addToLogout(token)

  return null
})
