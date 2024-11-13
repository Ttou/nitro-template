export default defineNitroPlugin((app) => {
  app.hooks.hook('request', (event) => {
    event.context.startTime = performance.now()
  })

  app.hooks.hook('beforeResponse', (event, response) => {
    const time = Math.round((performance.now() - event.context.startTime) * 1000) / 1000

    console.log('time', time)

    response.body = {
      success: true,
      status: getResponseStatus(event),
      message: getResponseStatusText(event),
      data: response.body,
    }
  })

  app.hooks.hookOnce('close', async () => {
    console.log('Closing nitro server...')
    await disposeContainer()

    console.log('Task is done!')
  })
})
