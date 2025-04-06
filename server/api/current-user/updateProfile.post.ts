import { wrap } from '@mikro-orm/core'

export default defineEventHandler({
  onRequest: [AuthenticationGuard()],
  handler: async (event) => {
    const result = await readValidatedBody(event, UpdateCurrentUserProfileDto.safeParse)
    const dto = parseValidateResult(result)

    const em = useEM()

    const oldRecord = await em.findOne(SysUserEntity,
      {
        id: { $eq: event.context.currentUser.id },
      },
    )

    if (!oldRecord) {
      throw badRequest('用户不存在')
    }

    wrap(oldRecord).assign({ ...dto })

    await em.persist(oldRecord).flush()

    return null
  },
})
