import { asValue } from 'awilix'

export default defineEventHandler((event) => {
  const scope = diContainer.createScope()

  scope.register({
    traceId: asValue(scope.cradle.idService.v7()),
  })

  event.context.scope = scope
})
