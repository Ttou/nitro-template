import { EventHandlerRequest, H3Event } from "h3";

export function getTokenFormEvent(event: H3Event<EventHandlerRequest>) {
    const authorization = getHeader(event, 'authorization')

    if (!authorization) {
      throw unauthorizedError('authorization 不存在')
    }

    const token = authorization.match(/Bearer (.+)/)?.[1]

    if (!token) {
      throw unauthorizedError('token 不存在')
    }

    return token
}