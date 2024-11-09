export default defineNitroErrorHandler((error, event) => {
  setResponseHeader(event, 'Content-Type', 'application/json')
  const data = JSON.stringify({
    success: false,
    status: error.statusCode,
    statusText: error.statusMessage,
    message: error.message,
    stack: error.stack,
  })
  return send(event, data)
})
