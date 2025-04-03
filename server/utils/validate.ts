import { SafeParseError, SafeParseSuccess } from 'zod'

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
