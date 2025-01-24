/**
 * 是否是管理员
 */
export const isAdmin = (user: SysUserEntityType) => user.id === BigInt(1)
