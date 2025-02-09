export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, FindSystemUserPageDto.safeParse)
  const dto = parseValidateResult(result)

  const { ormService } = event.context.scope.cradle
  const em = ormService.em.fork()

  const { page, pageSize, ...rest } = dto

  const [data, total] = await em.findAndCount<SysUserEntityType>(SysUserEntityName,
    {
      $and: [
        { userName: rest.userName ? { $like: `%${rest.userName}%` } : {} },
        { nickName: rest.nickName ? { $like: `%${rest.nickName}%` } : {} },
      ],
    },
    { limit: pageSize, offset: page - 1 },
  )

  return { page, pageSize, data, total }
})
