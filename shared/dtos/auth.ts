import { z } from 'zod'

export const LoginDto = z.object({
  userName: z.string({ required_error: '账号不能为空' }),
  password: z.string({ required_error: '密码不能为空' }).min(6, '密码最少6位'),
  captchaId: z.string({ required_error: '验证码ID不能为空' }),
  captchaValue: z.string({ required_error: '验证码不能为空' }),
})

export type ILoginDto = z.infer<typeof LoginDto>
