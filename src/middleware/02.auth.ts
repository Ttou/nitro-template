export default defineEventHandler((event) => {
  console.log('auth')

  const traceId = event.context.scope.resolve('traceId')

  console.log('traceId', traceId)
})
