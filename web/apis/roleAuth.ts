export const roleAuthApi = {
  findAllocatedUserPage(params: FindAllocatedPageDtoType) {
    return $fetch('/api/system/role/auth/findAllocatedUserPage', { method: 'POST', body: params })
  },
  findUnallocatedUserPage(params: FindUnallocatedPageDtoType) {
    return $fetch('/api/system/role/auth/findUnallocatedUserPage', { method: 'POST', body: params })
  },
  allocateUser(params: AllocateUserDtoType) {
    return $fetch('/api/system/role/auth/allocateUser', { method: 'POST', body: params })
  },
  unallocateUser(params: UnallocateUserDtoType) {
    return $fetch('/api/system/role/auth/unallocateUser', { method: 'POST', body: params })
  },
}
