export const deptApi = {
  findList(params: FindDeptListDtoType) {
    return $fetch('/api/system/dept/findList', { method: 'POST', body: params })
  },
}
