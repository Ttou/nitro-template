export default defineNitroPlugin(async () => {
  await configureContainer()

  const { loggerService } = diContainer.cradle

  loggerService.info('接口地址: http://localhost:3000/api')
  loggerService.info('Swagger文档地址: http://localhost:3000/api-docs')
  loggerService.info('Scalar文档地址: http://localhost:3000/api-scalar')
})
