export const roleAuthApi = {
  findAllocatedUserPage(params: IFindAllocatedUserPageDto) {
    return $fetch('/api/system/role/auth/findAllocatedUserPage', { method: 'POST', body: params })
  },
  findUnallocatedUserPage(params: IFindUnallocatedUserPageDto) {
    return $fetch('/api/system/role/auth/findUnallocatedUserPage', { method: 'POST', body: params })
  },
  allocateUser(params: IAllocateUserDto) {
    return $fetch('/api/system/role/auth/allocateUser', { method: 'POST', body: params })
  },
  unallocateUser(params: IUnallocateUserDto) {
    return $fetch('/api/system/role/auth/unallocateUser', { method: 'POST', body: params })
  },
}
