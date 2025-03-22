export default defineEventHandler(async (event) => {
  return await bullBoardService.ui.handler(event)
})
