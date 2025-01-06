import { z } from 'zod'

export const FindSystemDictTypePageDto = PageDto.extend({
  dictName: z.string().optional(),
  dictType: z.string().optional(),
  isAvailable: z.nativeEnum(YesOrNo.enum).optional(),
  beginTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),
})

export type FindSystemDictTypePageDtoType = z.infer<typeof FindSystemDictTypePageDto>

export const CreateSystemDictTypeDto = z.object({
  dictName: z.string({ required_error: '字典名称不能为空' }),
  dictType: z.string({ required_error: '字典类型不能为空' }),
  isAvailable: z.nativeEnum(YesOrNo.enum, { invalid_type_error: '是否可用参数格式不正确' }).optional(),
  remark: z.string().nullable().optional(),
})

export type CreateSystemDictTypeDtoType = z.infer<typeof CreateSystemDictTypeDto>

export const UpdateSystemDictTypeDto = CreateSystemDictTypeDto.extend({
  id: z.union([z.string(), z.number()]).transform(BigInt),
})

export type UpdateSystemDictTypeDtoType = z.infer<typeof UpdateSystemDictTypeDto>
