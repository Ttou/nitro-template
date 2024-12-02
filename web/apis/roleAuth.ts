export const roleAuthApi = {
  findAllocatedPage(params: FindAllocatedPageDtoType) {
    return $fetch('/api/system/role/auth/findAllocatedPage', { method: 'POST', body: params })
  },
}
