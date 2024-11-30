import { ElNotification } from 'element-plus'
import { FieldValues, PlusDialogProps, PlusFormProps, PlusPageInstance } from 'plus-pro-components'
import { Ref } from 'vue'

interface UseEditParams {
  pageInstance: Ref<PlusPageInstance>
}

export function useEdit({ pageInstance }: UseEditParams) {
  const editVisible = ref(false)
  const editValues = ref({})

  const editDialogProps = computed<PlusDialogProps>(() => ({
    title: '编辑配置',
    width: '700px',
  }))

  // @ts-ignore
  const editFormProps = computed<PlusFormProps>(() => ({
    labelWidth: '120px',
    labelPosition: 'right',
    columns: [
      {
        label: '参数名称',
        prop: 'configName',
      },
      {
        label: '参数键名',
        prop: 'configKey',
        fieldProps: {
          disabled: true,
        },
      },
      {
        label: '参数键值',
        prop: 'configValue',
      },
      {
        label: '系统内置',
        prop: 'isBuiltin',
        valueType: 'select',
        options: YesOrNo.options,
      },
      {
        label: '备注',
        prop: 'remark',
      },
    ],
    rules: {
      configName: [{ required: true, message: '请输入参数名称', trigger: 'blur' }],
      configKey: [{ required: true, message: '请输入参数键名', trigger: 'blur' }],
      configValue: [{ required: true, message: '请输入参数键值', trigger: 'blur' }],
    },
  }))

  function showEdit(params) {
    Object.assign(editValues.value, params)
    editVisible.value = true
  }

  async function confirmEdit(values: FieldValues) {
    await configApi.update(values)

    editValues.value = Object.create({})
    editVisible.value = false

    ElNotification.success({ title: '通知', message: '编辑成功' })

    pageInstance.value.getList()
  }

  return {
    editVisible,
    editValues,
    editDialogProps,
    editFormProps,
    showEdit,
    confirmEdit,
  }
}
