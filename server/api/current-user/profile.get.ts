export default defineEventHandler({
  onRequest: [AuthenticationGuard()],
  handler: async (event) => {},
})
