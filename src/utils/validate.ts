import { SafeParseError, SafeParseSuccess } from 'zod'

export class Validate {
  static parseResult<T>(result: SafeParseSuccess<T> | SafeParseError<T>) {
    if (result.success) {
      return result.data
    }

    const firstErrorMessage = result.error.issues[0].message

    throw HttpError.badRequest(firstErrorMessage)
  }
}
