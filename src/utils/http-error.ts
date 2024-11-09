export class HttpError {
  static badRequest(message: string) {
    return createError({ status: HttpStatus.BAD_REQUEST, statusText: 'Bad Request', message })
  }
}
