import { z } from 'zod'

export const FindPostListDto = z.object({
  postName: z.string().optional(),
  postCode: z.string().optional(),
  isAvailable: z.enum(YesOrNo.values).optional(),
})

export type FindPostListDtoType = z.infer<typeof FindPostListDto>

export const CreatePostDto = z.object({
  postName: z.string({ required_error: '岗位名称不能为空' }),
  postCode: z.string({ required_error: '岗位编码不能为空' }),
  isAvailable: z.enum(YesOrNo.values, { invalid_type_error: '是否可用参数格式不正确' }).optional(),
  remark: z.string().nullable().optional(),
})

export type CreatePostDtoType = z.infer<typeof CreatePostDto>

export const UpdatePostDto = CreatePostDto.extend({
  id: z.union([z.string(), z.number()]).transform(Number),
})

export type UpdatePostDtoType = z.infer<typeof UpdatePostDto>
