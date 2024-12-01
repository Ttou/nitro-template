import { z } from 'zod'

export const FindDictTypePageDto = PageDto.extend({
  dictName: z.string().optional(),
  dictType: z.string().optional(),
  isAvailable: z.enum(YesOrNo.values).optional(),
  beginTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),
})

export type FindDictTypePageDtoType = z.infer<typeof FindDictTypePageDto>

export const CreateDictTypeDto = z.object({
  dictName: z.string({ required_error: '字典名称不能为空' }),
  dictType: z.string({ required_error: '字典类型不能为空' }),
  isAvailable: z.enum(YesOrNo.values, { invalid_type_error: '是否可用参数格式不正确' }).optional(),
  remark: z.string().optional(),
})

export type CreateDictTypeDtoType = z.infer<typeof CreateDictTypeDto>

export const UpdateDictTypeDto = CreateDictTypeDto.extend({
  id: z.union([z.string(), z.number()]).transform(Number),
})

export type UpdateDictTypeDtoType = z.infer<typeof UpdateDictTypeDto>
