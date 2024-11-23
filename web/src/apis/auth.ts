import { InternalApi } from 'nitropack'

import { LoginDtoType } from '~/constants/dto/auth'

export const authApi = {
  login(data: LoginDtoType) {
    return ajax<AjaxResponse<InternalApi['/api/auth/login']['post']>>('/auth/login', { method: 'post', body: data })
  },
}
