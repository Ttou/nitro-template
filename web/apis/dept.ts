export const deptApi = {
  findList(params: FindSystemDeptListDtoType) {
    return $fetch('/api/system/dept/findList', { method: 'POST', body: params })
  },
  create(params: CreateSystemDeptDtoType) {
    return $fetch('/api/system/dept/create', { method: 'POST', body: params })
  },
  update(params: UpdateSystemDeptDtoType) {
    return $fetch('/api/system/dept/update', { method: 'POST', body: params })
  },
  remove(params: RemoveDtoType) {
    return $fetch('/api/system/dept/remove', { method: 'DELETE', body: params })
  },
}
