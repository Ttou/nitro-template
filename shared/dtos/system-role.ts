import { z } from 'zod'

export const FindSystemRolePageDto = PageDto.extend({
  roleName: z.string().optional(),
  roleKey: z.string().optional(),
  isAvailable: z.nativeEnum(YesOrNo.enum).optional(),
  beginTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),
})

export type IFindSystemRolePageDto = z.infer<typeof FindSystemRolePageDto>

export const CreateSystemRoleDto = z.object({
  roleName: z.string({ required_error: '角色名称不能为空' }),
  roleKey: z.string({ required_error: '角色标识不能为空' }),
  isAvailable: z.nativeEnum(YesOrNo.enum, { invalid_type_error: '是否可用参数格式不正确' }).optional(),
  remark: z.string().nullable().optional(),
})

export type ICreateSystemRoleDto = z.infer<typeof CreateSystemRoleDto>

export const UpdateSystemRoleDto = CreateSystemRoleDto.extend({
  id: z.union([z.string(), z.number()]).transform(BigInt),
})

export type IUpdateSystemRoleDto = z.infer<typeof UpdateSystemRoleDto>

export const FindAllocatedUserPageDto = PageDto.extend({
  id: z.union([z.string(), z.number()]).transform(BigInt),
  userName: z.string().optional(),
  nickName: z.string().optional(),
})

export type IFindAllocatedUserPageDto = z.infer<typeof FindAllocatedUserPageDto>

export const FindUnallocatedUserPageDto = FindAllocatedUserPageDto.extend({})

export type IFindUnallocatedUserPageDto = z.infer<typeof FindUnallocatedUserPageDto>

export const AllocateUserDto = z.object({
  id: z.union([z.string(), z.number()]).transform(BigInt),
  ids: z.array(z.union([z.string(), z.number()]).transform(BigInt)),
})

export type IAllocateUserDto = z.infer<typeof AllocateUserDto>

export const UnallocateUserDto = AllocateUserDto.extend({})

export type IUnallocateUserDto = z.infer<typeof UnallocateUserDto>
