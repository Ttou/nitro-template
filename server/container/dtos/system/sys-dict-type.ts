import { z } from 'zod'

export const FindSysDictTypePageDto = PageDto.extend({
  dictName: z.string().optional(),
  dictType: z.string().optional(),
  isAvailable: z.nativeEnum(YesOrNo.enum).optional(),
  beginTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),
})

export type FindSysDictTypePageDtoType = z.infer<typeof FindSysDictTypePageDto>

export const CreateSysDictTypeDto = z.object({
  dictName: z.string({ required_error: '字典名称不能为空' }),
  dictType: z.string({ required_error: '字典类型不能为空' }),
  isAvailable: z.nativeEnum(YesOrNo.enum, { invalid_type_error: '是否可用参数格式不正确' }).optional(),
  remark: z.string().nullable().optional(),
})

export type CreateSysDictTypeDtoType = z.infer<typeof CreateSysDictTypeDto>

export const UpdateSysDictTypeDto = CreateSysDictTypeDto.extend({
  id: z.union([z.string(), z.number()]).transform(BigInt),
})

export type UpdateSysDictTypeDtoType = z.infer<typeof UpdateSysDictTypeDto>
