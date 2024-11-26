import { FindUserPageDtoType } from '~/container/dtos/system/user'

export const userApi = {
  findPage(data: FindUserPageDtoType) {
    return $fetch('/api/system/user/findPage', { method: 'POST', body: data })
  },
}
