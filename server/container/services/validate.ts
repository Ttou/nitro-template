import { SafeParseError, SafeParseSuccess, z } from 'zod'

export class ValidateService {
  /**
   * 解析校验结果
   * @param result
   * @returns
   */
  parseResult<T>(result: SafeParseSuccess<T> | SafeParseError<T>) {
    if (result.success) {
      return result.data
    }

    const firstErrorMessage = result.error.issues[0].message

    throw badRequest(firstErrorMessage)
  }
}
