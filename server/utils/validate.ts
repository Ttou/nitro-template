import { EventHandlerRequest, H3Event } from 'h3'
import { SafeParseError, SafeParseSuccess } from 'zod'

/**
 * 是否是私有路径
 */
export const isPrivatePath = ({ path }: H3Event<EventHandlerRequest>) => {
  return path.startsWith('/api/') && !['/api/auth/login'].includes(path)
}

/**
 * 是否是管理员
 */
export const isAdmin = (user: any) => user.id === BigInt(1)

/**
 * 解析校验结果
 */
export function parseValidateResult<T>(result: SafeParseSuccess<T> | SafeParseError<T>) {
  if (result.success) {
    return result.data
  }

  const firstErrorMessage = result.error.issues[0].message

  console.error(result.error)

  throw badRequest(firstErrorMessage)
}
