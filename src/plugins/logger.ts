export default defineNitroPlugin((app) => {
  app.hooks.hook('request', (event) => {
    const logger = useLogger()
    logger.info('Request start')
  })

  app.hooks.hook('afterResponse', (event, { body }) => {
    const logger = useLogger()
    logger.info('Request end')
  })
})
