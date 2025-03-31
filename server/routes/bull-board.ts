export default defineEventHandler(async (event) => {
  return await diContainer.cradle.bullBoardService.ui.handler(event)
})
