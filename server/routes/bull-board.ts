export default defineEventHandler({
  onRequest: [BasicAuthenticationGuard()],
  handler: async (event) => {
    return await diContainer.cradle.bullBoardService.ui.handler(event)
  },
})
