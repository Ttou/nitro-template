export default defineEventHandler(async (event) => {
  const token = useToken()
  const { jwtService } = event.context.scope.cradle

  await jwtService.addToLogout(token)

  return null
})
