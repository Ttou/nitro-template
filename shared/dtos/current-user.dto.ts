import { z } from 'zod'

export const UpdateCurrentUserPasswordDto = z
  .object({
    oldPassword: z.string({ required_error: '旧密码不能为空' }),
    newPassword: z.string({ required_error: '新密码不能为空' }).min(6, '密码长度不能小于6位'),
    confirmPassword: z.string({ required_error: '确认密码不能为空' }),
  })
  .refine(data => data.newPassword === data.confirmPassword,
    {
      message: '两次密码不一致',
      path: ['confirmPassword'],
    },
  )

export type IUpdateCurrentUserPasswordDto = z.infer<typeof UpdateCurrentUserPasswordDto>

export const UpdateCurrentUserProfileDto = z
  .object({
    nickname: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email().optional(),
    avatar: z.string().optional(),
  })

export type IUpdateCurrentUserProfileDto = z.infer<typeof UpdateCurrentUserProfileDto>
