export class ErrorUtil {
  static badRequest(message: string) {
    return createError({ status: HttpStatusEnum.BAD_REQUEST, statusText: 'Bad Request', message })
  }
}
