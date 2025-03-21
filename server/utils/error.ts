export const badRequest = (message: string) => createError({ status: httpStatusEnum.BAD_REQUEST, statusText: httpStatusEnum.map[httpStatusEnum.BAD_REQUEST].label, message })

export const internalServerError = (message: string) => createError({ status: httpStatusEnum.INTERNAL_SERVER_ERROR, statusText: httpStatusEnum.map[httpStatusEnum.INTERNAL_SERVER_ERROR].label, message })

export const unauthorizedError = (message: string) => createError({ status: httpStatusEnum.UNAUTHORIZED, statusText: httpStatusEnum.map[httpStatusEnum.UNAUTHORIZED].label, message })

export const forbiddenError = (message: string) => createError({ status: httpStatusEnum.FORBIDDEN, statusText: httpStatusEnum.map[httpStatusEnum.FORBIDDEN].label, message })
