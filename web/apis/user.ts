import { InternalApi } from 'nitropack'

import { FindUserPageDtoType } from '~/container/dtos/system/user'

export const userApi = {
  findPage(data: FindUserPageDtoType) {
    return ajax<AjaxResponse<InternalApi['/api/user/findPage']['post']>>('/user/findPage', { method: 'post', body: data })
  },
}
