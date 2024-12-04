import { z } from 'zod'

export function validateEmail(email: string) {
  const emailSchema = z.string().email()
  const { success, error } = emailSchema.safeParse(email)

  if (!success) {
    return {
      success: false,
      message: error.errors[0].message,
    }
  }

  return {
    success: true,
    message: 'Email is valid',
  }
}
