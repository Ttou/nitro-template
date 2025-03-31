export default defineEventHandler(async (event) => {
  return await diContainer.cradle.captchaService.image()
})
