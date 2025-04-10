import { wrap } from '@mikro-orm/core'

export default defineEventHandler({
  onRequest: [useAuthentication(), useAuthorization('sys.menu.system.user.update')],
  handler: async (event) => {
    const result = await readValidatedBody(event, UpdateSystemUserDto.safeParse)
    const dto = parseValidateResult(result)

    const em = useEM()

    const { id, userName, ...rest } = dto

    const oldRecord = await em.findOne(SysUserEntity,
      {
        $and: [
          { id: { $eq: id } },
          { userName: { $eq: userName } },
        ],
      },
    )

    if (!oldRecord) {
      throw badRequest('用户不存在')
    }

    wrap(oldRecord).assign(rest)

    await em.persist(oldRecord).flush()

    return null
  },
})
