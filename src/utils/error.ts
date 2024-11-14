export const badRequest = (message: string) => createError({ status: HttpStatusEnum.BAD_REQUEST, message })

export const internalServerError = (message: string) => createError({ status: HttpStatusEnum.INTERNAL_SERVER_ERROR, message })
