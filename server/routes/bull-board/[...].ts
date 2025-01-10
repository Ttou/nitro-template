export default defineEventHandler(async (event) => {
  const { bullBoardService } = diContainer.cradle

  return await bullBoardService.ui.handler(event)
})
