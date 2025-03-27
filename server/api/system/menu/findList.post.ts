export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, FindSystemMenuListDto.safeParse)
  const dto = parseValidateResult(result)

  const em = useEM()

  const { menuName, menuKey, isAvailable } = dto

  const data = await em.findAll(SysMenuEntity,
    {
      where: {
        menuName: menuName ? { $like: `%${menuName}%` } : {},
        menuKey: menuKey ? { $like: `%${menuKey}%` } : {},
        isAvailable: isAvailable ? { $eq: isAvailable } : {},
      },
    },
  )

  return data
})
