import { wrap } from '@mikro-orm/core'

export default defineEventHandler({
  onRequest: [useAuthentication(), useAuthorization('sys.menu.system.config.update')],
  handler: async (event) => {
    const result = await readValidatedBody(event, UpdateSystemConfigDto.safeParse)
    const dto = parseValidateResult(result)

    const em = useEM()

    const { id, configKey, ...rest } = dto

    const oldRecord = await em.findOne(SysConfigEntity,
      {
        $and: [
          { id: { $eq: id } },
          { configKey: { $eq: configKey } },
        ],
      },
    )

    if (!oldRecord) {
      throw badRequest(`配置标识 ${configKey} 不存在`)
    }

    wrap(oldRecord).assign(rest)

    await em.persist(oldRecord).flush()

    return null
  },
})
