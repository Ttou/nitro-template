export default defineEventHandler(async (event) => {
  const { captchaService } = event.context.scope.cradle

  return await captchaService.image()
})
