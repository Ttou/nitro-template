export default defineEventHandler({
  onRequest: [AuthenticationGuard()],
  handler: async (event) => {
    return 'Real Hello World!'
  },
})
