export default defineEventHandler(async (event) => {
  return await captchaService.image()
})
