import { z } from 'zod'

export const FindSystemRolePageDto = PageDto.extend({
  roleName: z.string().optional(),
  roleKey: z.string().optional(),
  isAvailable: z.nativeEnum(YesOrNoDict.enum).optional(),
  beginTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),
})

export type IFindSystemRolePageDto = z.infer<typeof FindSystemRolePageDto>

export const CreateSystemRoleDto = z.object({
  roleName: z.string({ required_error: '角色名称不能为空' }),
  roleKey: z.string({ required_error: '角色标识不能为空' }),
  isAvailable: z.nativeEnum(YesOrNoDict.enum, { invalid_type_error: '是否可用参数格式不正确' }).optional(),
  remark: z.string().nullable().optional(),
})

export type ICreateSystemRoleDto = z.infer<typeof CreateSystemRoleDto>

export const UpdateSystemRoleDto = CreateSystemRoleDto.extend({
  id: z.union([z.string(), z.number()]).transform(BigInt),
})

export type IUpdateSystemRoleDto = z.infer<typeof UpdateSystemRoleDto>

export const FindAllocatedUserPageForRoleDto = PageDto.extend({
  id: z.union([z.string(), z.number()]).transform(BigInt),
  userName: z.string().optional(),
  nickName: z.string().optional(),
})

export type IFindAllocatedUserPageForRoleDto = z.infer<typeof FindAllocatedUserPageForRoleDto>

export const FindUnallocatedUserPageForRoleDto = FindAllocatedUserPageForRoleDto.extend({})

export type IFindUnallocatedUserPageForRoleDto = z.infer<typeof FindUnallocatedUserPageForRoleDto>

export const AllocateUserForRoleDto = z.object({
  id: z.union([z.string(), z.number()]).transform(BigInt),
  ids: z.array(z.union([z.string(), z.number()]).transform(BigInt)),
})

export type IAllocateUserForRoleDto = z.infer<typeof AllocateUserForRoleDto>

export const UnallocateUserForRoleDto = AllocateUserForRoleDto.extend({})

export type IUnallocateUserForRoleDto = z.infer<typeof UnallocateUserForRoleDto>

export const AssignMenuForRoleDto = z.object({
  id: z.union([z.string(), z.number()]).transform(BigInt),
  menuIds: z.array(z.union([z.string(), z.number()]).transform(BigInt)),
})

export type IAssignMenuForRoleDto = z.infer<typeof AssignMenuForRoleDto>

export const FindAssignedMenuForRoleDto = z.object({
  id: z.union([z.string(), z.number()]).transform(BigInt),
})

export type IFindAssignedMenuForRoleDto = z.infer<typeof FindAssignedMenuForRoleDto>
