export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, UnallocateUserDto.safeParse)
  const dto = parseValidateResult(result)

  const em = useEM()

  const { id, ids } = dto

  const users = await em.find(SysUserEntity,
    {
      id: { $in: ids },
    },
    { populate: ['roles'] },
  )

  for (const user of users) {
    user.roles.remove(item => item.id === id)
  }

  await em.persist(users).flush()

  return null
})
