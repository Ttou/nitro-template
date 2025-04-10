import { wrap } from '@mikro-orm/core'

export default defineEventHandler({
  onRequest: [useAuthentication(), useAuthorization('sys.menu.system.dept.update')],
  handler: async (event) => {
    const result = await readValidatedBody(event, UpdateSystemDeptDto.safeParse)
    const dto = parseValidateResult(result)

    const em = useEM()

    const { id, deptKey, ...rest } = dto

    const oldRecord = await em.findOne(SysDeptEntity,
      {
        $and: [
          { id: { $eq: id } },
          { deptKey: { $eq: deptKey } },
        ],
      },
    )

    if (!oldRecord) {
      throw badRequest(`部门标识 ${deptKey} 不存在`)
    }

    wrap(oldRecord).assign(rest)

    await em.persist(oldRecord).flush()

    return null
  },
})
