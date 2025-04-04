import { z } from 'zod'

export const FindSystemPostPageDto = PageDto.extend({
  postName: z.string().optional(),
  postKey: z.string().optional(),
  isAvailable: z.nativeEnum(YesOrNoDict.enum).optional(),
  beginTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),
})

export type IFindSystemPostPageDto = z.infer<typeof FindSystemPostPageDto>

export const CreateSystemPostDto = z.object({
  postName: z.string({ required_error: '岗位名称不能为空' }),
  postKey: z.string({ required_error: '岗位标识不能为空' }),
  isAvailable: z.nativeEnum(YesOrNoDict.enum, { invalid_type_error: '是否可用参数格式不正确' }).optional(),
  remark: z.string().nullable().optional(),
})

export type ICreateSystemPostDto = z.infer<typeof CreateSystemPostDto>

export const UpdateSystemPostDto = CreateSystemPostDto.extend({
  id: z.union([z.string(), z.number()]).transform(BigInt),
})

export type IUpdateSystemPostDto = z.infer<typeof UpdateSystemPostDto>

export const FindAllocatedUserPageForPostDto = PageDto.extend({
  id: z.union([z.string(), z.number()]).transform(BigInt),
  userName: z.string().optional(),
  nickName: z.string().optional(),
})

export type IFindAllocatedUserPageForPostDto = z.infer<typeof FindAllocatedUserPageForPostDto>

export const FindUnallocatedUserPageForPostDto = FindAllocatedUserPageForPostDto.extend({})

export type IFindUnallocatedUserPageForPostDto = z.infer<typeof FindUnallocatedUserPageForPostDto>

export const AllocateUserForPostDto = z.object({
  id: z.union([z.string(), z.number()]).transform(BigInt),
  ids: z.array(z.union([z.string(), z.number()]).transform(BigInt)),
})

export type IAllocateUserForPostDto = z.infer<typeof AllocateUserForPostDto>

export const UnallocateUserForPostDto = AllocateUserForPostDto.extend({})

export type IUnallocateUserForPostDto = z.infer<typeof UnallocateUserForPostDto>
