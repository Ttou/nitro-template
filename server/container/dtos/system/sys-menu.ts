import { z } from 'zod'

export const FindSysMenuListDto = z.object({
  menuName: z.string().optional(),
  menuKey: z.string().optional(),
  isAvailable: z.nativeEnum(YesOrNo.enum).optional(),
})

export type FindSysMenuListDtoType = z.infer<typeof FindSysMenuListDto>

export const CreateSysMenuDto = z.object({
  parentId: z.union([z.string(), z.number()]).transform(Number),
  menuName: z.string({ required_error: '菜单名称不能为空' }),
  menuKey: z.string({ required_error: '菜单标识不能为空' }),
  menuType: z.nativeEnum(MenuType.enum, { invalid_type_error: '菜单类型参数格式不正确' }),
  orderNum: z.number({ required_error: '排序不能为空' }).transform(Number),
  path: z.string().optional(),
  component: z.string().optional(),
  redirect: z.string().optional(),
  icon: z.string().optional(),
  isAvailable: z.nativeEnum(YesOrNo.enum, { invalid_type_error: '是否可用参数格式不正确' }).optional(),
  isFrame: z.nativeEnum(YesOrNo.enum, { invalid_type_error: '是否外链参数格式不正确' }).optional(),
  isCache: z.nativeEnum(YesOrNo.enum, { invalid_type_error: '是否缓存参数格式不正确' }).optional(),
  isVisible: z.nativeEnum(YesOrNo.enum, { invalid_type_error: '是否显示参数格式不正确' }).optional(),
  remark: z.string().nullable().optional(),
})

export type CreateSysMenuDtoType = z.infer<typeof CreateSysMenuDto>

export const UpdateSysMenuDto = CreateSysMenuDto.extend({
  id: z.union([z.string(), z.number()]).transform(Number),
})

export type UpdateSysMenuDtoType = z.infer<typeof UpdateSysMenuDto>
