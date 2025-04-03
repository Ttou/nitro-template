export default defineEventHandler({
  onRequest: [AuthenticationGuard()],
  handler: async (event) => {
    const token = useToken()

    await diContainer.cradle.jwtService.addToLogout(token)

    return null
  },
})
