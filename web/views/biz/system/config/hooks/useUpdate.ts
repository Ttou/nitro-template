import { ElNotification } from 'element-plus'
import { FieldValues, PlusDialogProps, PlusFormProps, PlusPageInstance } from 'plus-pro-components'
import { Ref } from 'vue'

interface UseUpdateParams {
  pageInstance: Ref<PlusPageInstance>
}

export function useUpdate({ pageInstance }: UseUpdateParams) {
  const updateVisible = ref(false)
  const updateValues = ref({})

  const updateDialogProps = computed<PlusDialogProps>(() => ({
    title: '编辑配置',
    width: '700px',
  }))

  // @ts-ignore
  const updateFormProps = computed<PlusFormProps>(() => ({
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

  function showUpdate(params) {
    Object.assign(updateValues.value, params)
    updateVisible.value = true
  }

  async function confirmUpdate(values: FieldValues) {
    await configApi.update(values)

    updateValues.value = Object.create({})
    updateVisible.value = false

    ElNotification.success({ title: '通知', message: '编辑成功' })

    pageInstance.value.getList()
  }

  return {
    updateVisible,
    updateValues,
    updateDialogProps,
    updateFormProps,
    showUpdate,
    confirmUpdate,
  }
}
