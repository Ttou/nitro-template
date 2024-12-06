export const deptApi = {
  findList(params: FindSysDeptListDtoType) {
    return $fetch('/api/system/dept/findList', { method: 'POST', body: params })
  },
  create(params: CreateSysDeptDtoType) {
    return $fetch('/api/system/dept/create', { method: 'POST', body: params })
  },
  update(params: UpdateSysDeptDtoType) {
    return $fetch('/api/system/dept/update', { method: 'POST', body: params })
  },
  remove(params: RemoveDtoType) {
    return $fetch('/api/system/dept/remove', { method: 'DELETE', body: params })
  },
}
