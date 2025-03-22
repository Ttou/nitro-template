export function useEM() {
  const event = useEvent()

  const { reqId } = event.context

  const em = ormService.em.fork({ loggerContext: { reqId } })

  return em
}
