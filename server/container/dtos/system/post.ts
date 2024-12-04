import { z } from 'zod'

export const FindPostPageDto = PageDto.extend({
  postName: z.string().optional(),
  postKey: z.string().optional(),
  isAvailable: z.enum(YesOrNo.values).optional(),
  beginTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),
})

export type FindPostPageDtoType = z.infer<typeof FindPostPageDto>

export const CreatePostDto = z.object({
  postName: z.string({ required_error: '岗位名称不能为空' }),
  postKey: z.string({ required_error: '岗位标识不能为空' }),
  isAvailable: z.enum(YesOrNo.values, { invalid_type_error: '是否可用参数格式不正确' }).optional(),
  remark: z.string().nullable().optional(),
})

export type CreatePostDtoType = z.infer<typeof CreatePostDto>

export const UpdatePostDto = CreatePostDto.extend({
  id: z.union([z.string(), z.number()]).transform(Number),
})

export type UpdatePostDtoType = z.infer<typeof UpdatePostDto>
