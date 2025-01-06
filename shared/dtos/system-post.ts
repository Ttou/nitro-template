import { z } from 'zod'

export const FindSystemPostPageDto = PageDto.extend({
  postName: z.string().optional(),
  postKey: z.string().optional(),
  isAvailable: z.nativeEnum(YesOrNo.enum).optional(),
  beginTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),
})

export type FindSystemPostPageDtoType = z.infer<typeof FindSystemPostPageDto>

export const CreateSystemPostDto = z.object({
  postName: z.string({ required_error: '岗位名称不能为空' }),
  postKey: z.string({ required_error: '岗位标识不能为空' }),
  isAvailable: z.nativeEnum(YesOrNo.enum, { invalid_type_error: '是否可用参数格式不正确' }).optional(),
  remark: z.string().nullable().optional(),
})

export type CreateSystemPostDtoType = z.infer<typeof CreateSystemPostDto>

export const UpdateSystemPostDto = CreateSystemPostDto.extend({
  id: z.union([z.string(), z.number()]).transform(BigInt),
})

export type UpdateSystemPostDtoType = z.infer<typeof UpdateSystemPostDto>
