import { wrap } from '@mikro-orm/core'

export default defineEventHandler({
  onRequest: [AuthenticationGuard(), AuthorizationGuard('sys.menu.system.post.update')],
  handler: async (event) => {
    const result = await readValidatedBody(event, UpdateSystemPostDto.safeParse)
    const dto = parseValidateResult(result)

    const em = useEM()

    const { id, postKey, ...rest } = dto

    const oldRecord = await em.findOne(SysPostEntity,
      {
        $and: [
          { id: { $eq: id } },
          { postKey: { $eq: postKey } },
        ],
      },
    )

    if (!oldRecord) {
      throw badRequest(`岗位标识 ${postKey} 不存在`)
    }

    wrap(oldRecord).assign(rest)

    await em.persist(oldRecord).flush()

    return null
  },
})
