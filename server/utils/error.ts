export const badRequest = (message: string) => createError({ status: HttpStatusEnum.BAD_REQUEST, message })

export const internalServerError = (message: string) => createError({ status: HttpStatusEnum.INTERNAL_SERVER_ERROR, message })

export const unauthorizedError = (message: string) => createError({ status: HttpStatusEnum.UNAUTHORIZED, message })

export const forbiddenError = (message: string) => createError({ status: HttpStatusEnum.FORBIDDEN, message })
