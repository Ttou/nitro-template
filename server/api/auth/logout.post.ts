export default defineEventHandler({
  onRequest: [useAuthentication()],
  handler: async (event) => {
    const token = useToken()

    await diContainer.cradle.jwtService.addToLogout(token)

    return null
  },
})
