import { z } from 'zod'

export const FindSysConfigByKeyDto = z.object({
  configKey: z.string({ required_error: '参数键名不能为空' }),
})

export type FindSysConfigByKeyDtoType = z.infer<typeof FindSysConfigByKeyDto>

export const FindSysConfigPageDto = PageDto.extend({
  configName: z.string().optional(),
  configKey: z.string().optional(),
  isBuiltin: z.nativeEnum(YesOrNo.enum).optional(),
  isAvailable: z.nativeEnum(YesOrNo.enum).optional(),
  beginTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),
})

export type FindSysConfigPageDtoType = z.infer<typeof FindSysConfigPageDto>

export const CreateSysConfigDto = z.object({
  configName: z.string({ required_error: '参数名称不能为空' }),
  configKey: z.string({ required_error: '参数标识不能为空' }),
  configValue: z.string({ required_error: '参数键值不能为空' }),
  isBuiltin: z.nativeEnum(YesOrNo.enum, { invalid_type_error: '是否内置格式不正确' }).optional(),
  isAvailable: z.nativeEnum(YesOrNo.enum, { invalid_type_error: '是否可用格式不正确' }).optional(),
  remark: z.string().nullable().optional(),
})

export type CreateSysConfigDtoType = z.infer<typeof CreateSysConfigDto>

export const UpdateSysConfigDto = CreateSysConfigDto.extend({
  id: z.union([z.string(), z.number()]).transform(Number),
})

export type UpdateSysConfigDtoType = z.infer<typeof UpdateSysConfigDto>
