export const roleAuthApi = {
  findAllocatedUserPage(params: IFindAllocatedUserPageForRoleDto) {
    return $fetch('/api/system/role/auth/findAllocatedUserPage', { method: 'POST', body: params })
  },
  findUnallocatedUserPage(params: IFindUnallocatedUserPageForRoleDto) {
    return $fetch('/api/system/role/auth/findUnallocatedUserPage', { method: 'POST', body: params })
  },
  allocateUser(params: IAllocateUserForRoleDto) {
    return $fetch('/api/system/role/auth/allocateUser', { method: 'POST', body: params })
  },
  unallocateUser(params: IUnallocateUserForRoleDto) {
    return $fetch('/api/system/role/auth/unallocateUser', { method: 'POST', body: params })
  },
}
