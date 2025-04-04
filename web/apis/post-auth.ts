export const postAuthApi = {
  findAllocatedUserPage(params: IFindAllocatedUserPageForPostDto) {
    return $fetch('/api/system/post/auth/findAllocatedUserPage', { method: 'POST', body: params })
  },
  findUnallocatedUserPage(params: IFindUnallocatedUserPageForPostDto) {
    return $fetch('/api/system/post/auth/findUnallocatedUserPage', { method: 'POST', body: params })
  },
  allocateUser(params: IAllocateUserForPostDto) {
    return $fetch('/api/system/post/auth/allocateUser', { method: 'POST', body: params })
  },
  unallocateUser(params: IUnallocateUserForPostDto) {
    return $fetch('/api/system/post/auth/unallocateUser', { method: 'POST', body: params })
  },
}
