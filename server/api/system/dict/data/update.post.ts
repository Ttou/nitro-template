import { wrap } from '@mikro-orm/core'

export default defineEventHandler({
  onRequest: [AuthenticationGuard(), AuthorizationGuard('sys.menu.system.dictData.update')],
  handler: async (event) => {
    const result = await readValidatedBody(event, UpdateSystemDictDataDto.safeParse)
    const dto = parseValidateResult(result)

    const em = useEM()

    const { id, dictValue, ...rest } = dto

    const oldRecord = await em.findOne(SysDictDataEntity,
      {
        $and: [
          { id: { $eq: id } },
          { dictValue: { $eq: dictValue } },
        ],
      },
    )

    if (!oldRecord) {
      throw badRequest(`字典值 ${dto.dictValue} 不存在`)
    }

    wrap(oldRecord).assign(rest)

    await em.persist(oldRecord).flush()

    return null
  },
})
