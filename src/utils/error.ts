export const badRequest = (message: string) => createError({ status: HttpStatusEnum.BAD_REQUEST, statusText: 'Bad Request', message })

export const internalServerError = (message: string) => createError({ status: HttpStatusEnum.INTERNAL_SERVER_ERROR, statusText: 'Internal Server Error', message })
