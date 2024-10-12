export default defineNitroPlugin(app => {
  app.hooks.hook('request', event => {
    logger.info('Request start')
  })

  app.hooks.hook('afterResponse', (event, { body }) => {
    logger.info('Request end')
  })
})