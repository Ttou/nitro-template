export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, FindUnallocatedUserPageDto.safeParse)
  const dto = parseValidateResult(result)

  const em = useEM()

  const { page, pageSize, ...rest } = dto

  const allocatedUsers = await em.find<ISysUserEntity>(sysUserEntity.name,
    {
      roles: { id: { $eq: rest.id } },
    },
  )

  const [data, total] = await em.findAndCount<ISysUserEntity, ISysUserEntityRelationKeys>(sysUserEntity.name,
    {
      $and: [
        { id: { $nin: allocatedUsers.map(item => item.id) } },
        { userName: rest.userName ? { $like: `%${rest.userName}%` } : {} },
        { nickName: rest.nickName ? { $like: `%${rest.nickName}%` } : {} },
      ],
    },
    { limit: pageSize, offset: page - 1, populate: ['roles'] },
  )

  return { page, pageSize, data, total }
})
