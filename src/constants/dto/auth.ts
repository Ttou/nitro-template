import { z } from 'zod'

export const LoginDto = z.object({
  username: z.string({ required_error: '用户名不能为空' }),
  password: z.string({ required_error: '密码不能为空' }).min(6, '密码最少6位'),
})
