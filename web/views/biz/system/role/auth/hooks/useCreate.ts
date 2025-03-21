import { ElMessage } from 'element-plus'

interface UseCreateParams {
  pageInstance: Ref<PlusPageInstance>
  id: ComputedRef<string | number>
}

export function useCreate({ pageInstance, id }: UseCreateParams) {
  const createVisible = ref(false)
  const createConfirmLoading = ref(false)
  const createSelectedIds = ref<string[]>([])

  const createDialogProps = computed<PlusDialogProps>(() => ({
    title: '添加授权',
    width: '1200px',
    confirmLoading: unref(createConfirmLoading),
    destroyOnClose: true,
  }))
  const createPageProps = computed<PlusPageProps>(() => ({
    columns: [
      {
        label: '账号',
        prop: 'userName',
      },
      {
        label: '昵称',
        prop: 'nickName',
      },
      {
        label: '手机',
        prop: 'phone',
        hideInSearch: true,
      },
      {
        label: '邮箱',
        prop: 'email',
        hideInSearch: true,
      },
      {
        label: '是否可用',
        prop: 'isAvailable',
        valueType: 'select',
        options: yesOrNoEnum.options,
        hideInSearch: true,
      },
    ],
    search: {
      showNumber: 3,
    },
    table: {
      isSelection: true,
      onSelectionChange: (data: any[]) => {
        createSelectedIds.value = [...data].map(item => item.id)
      },
    },
    request: async (params) => {
      return await roleAuthApi.findUnallocatedUserPage({
        id: unref(id),
        ...params,
      })
    },
    searchCardProps: {
      shadow: 'never',
    },
    tableCardProps: {
      shadow: 'never',
    },
  }))

  function showCreate() {
    createVisible.value = true
  }

  async function confirmCreate() {
    if (createSelectedIds.value.length === 0) {
      ElMessage.error('请选择要授权的用户')
      return
    }

    try {
      createConfirmLoading.value = true

      await roleAuthApi.allocateUser({
        id: unref(id),
        ids: unref(createSelectedIds),
      })

      createConfirmLoading.value = false
      createVisible.value = false
      pageInstance.value.getList()
    }
    catch (error) {
      createConfirmLoading.value = false
    }
  }

  return {
    createVisible,
    createDialogProps,
    createPageProps,
    showCreate,
    confirmCreate,
  }
}
