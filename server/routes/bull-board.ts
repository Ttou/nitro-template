export default defineEventHandler({
  onRequest: [useBasicAuthentication()],
  handler: async (event) => {
    return await diContainer.cradle.bullBoardService.ui.handler(event)
  },
})
