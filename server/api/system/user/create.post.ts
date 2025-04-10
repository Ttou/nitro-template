export default defineEventHandler({
  onRequest: [useAuthentication(), useAuthorization('sys.menu.system.user.create')],
  handler: async (event) => {
    const result = await readValidatedBody(event, CreateSystemUserDto.safeParse)
    const dto = parseValidateResult(result)

    const em = useEM()

    const { userName, email } = dto

    const oldRecord = await em.findOne(SysUserEntity,
      {
        $or: [
          { userName: { $eq: userName } },
          { email: { $eq: email } },
        ],
      },
    )

    if (oldRecord) {
      throw badRequest(`用户名或邮箱已存在`)
    }

    const password = await diContainer.cradle.hashService.hash(dto.password)
    const newRecord = em.create(SysUserEntity, { ...dto, isDelete: YesOrNoDict.enum.NO, password })
    await em.persist(newRecord).flush()

    return null
  },
})
