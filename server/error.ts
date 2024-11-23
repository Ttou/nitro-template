export default defineNitroErrorHandler((error, event) => {
  setResponseHeader(event, 'Content-Type', 'application/json')

  return send(
    event,
    JSON.stringify({
      success: false,
      code: error.statusCode,
      message: error.message,
      data: null,
    }),
  )
})
