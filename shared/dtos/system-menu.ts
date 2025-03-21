import { z } from 'zod'

export const FindSystemMenuListDto = z.object({
  menuName: z.string().optional(),
  menuKey: z.string().optional(),
  isAvailable: z.enum(yesOrNoEnum.values as [IYesOrNoEnum]).optional(),
})

export type IFindSystemMenuListDto = z.infer<typeof FindSystemMenuListDto>

export const CreateSystemMenuDto = z.object({
  parentId: z.union([z.string(), z.number()]).nullable().optional().transform(val => val ? BigInt(val) : null),
  menuName: z.string({ required_error: '菜单名称不能为空' }),
  menuKey: z.string({ required_error: '菜单标识不能为空' }),
  menuType: z.enum(menuTypeEnum.values as [IMenuTypeEnum], { invalid_type_error: '菜单类型参数格式不正确' }),
  orderNum: z.union([z.string(), z.number()], { required_error: '排序不能为空' }).transform(Number),
  path: z.string().nullable().optional(),
  component: z.string().nullable().optional(),
  redirect: z.string().nullable().optional(),
  icon: z.string().nullable().optional(),
  isAvailable: z.enum(yesOrNoEnum.values as [IYesOrNoEnum], { invalid_type_error: '是否可用参数格式不正确' }).optional(),
  isFrame: z.enum(yesOrNoEnum.values as [IYesOrNoEnum], { invalid_type_error: '是否外链参数格式不正确' }).optional(),
  isCache: z.enum(yesOrNoEnum.values as [IYesOrNoEnum], { invalid_type_error: '是否缓存参数格式不正确' }).optional(),
  isVisible: z.enum(yesOrNoEnum.values as [IYesOrNoEnum], { invalid_type_error: '是否显示参数格式不正确' }).optional(),
  remark: z.string().nullable().optional(),
})

export type ICreateSystemMenuDto = z.infer<typeof CreateSystemMenuDto>

export const UpdateSystemMenuDto = CreateSystemMenuDto.extend({
  id: z.union([z.string(), z.number()]).transform(BigInt),
})

export type IUpdateSystemMenuDto = z.infer<typeof UpdateSystemMenuDto>
