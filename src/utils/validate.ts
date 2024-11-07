import { SafeParseError, SafeParseSuccess } from 'zod'

function createUseValidate() {
  /**
   * 解析校验结果
   * @param result
   * @returns
   */
  const parseResult = <T>(result: SafeParseSuccess<T> | SafeParseError<T>) => {
    if (result.success) {
      return result.data
    }

    const firstErrorMessage = result.error.issues[0].message

    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: firstErrorMessage,
    })
  }

  return function () {
    return {
      parseResult,
    }
  }
}

export const useValidate = createUseValidate()
