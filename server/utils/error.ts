export const badRequest = (message: string) => createError({ status: 404, statusText: '找不到', message })

export const internalServerError = (message: string) => createError({ status: 500, statusText: '服务器内部错误', message })

export const unauthorizedError = (message: string) => createError({ status: 401, statusText: '未授权', message })

export const forbiddenError = (message: string) => createError({ status: 403, statusText: '禁止', message })
