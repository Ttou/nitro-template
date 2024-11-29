import { ElNotification } from 'element-plus'
import { FieldValues, PlusDialogProps, PlusFormProps, PlusPageInstance } from 'plus-pro-components'
import { Ref } from 'vue'

interface UseCreateParams {
  pageInstance: Ref<PlusPageInstance>
}

export function useCreate({ pageInstance }: UseCreateParams) {
  const createVisible = ref(false)
  const createValues = ref({})

  const createDialogProps = computed<PlusDialogProps>(() => ({
    title: '新增配置',
    width: '700px',
  }))

  const createFormProps = computed<PlusFormProps>(() => ({
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
      },
      {
        label: '参数键值',
        prop: 'configValue',
      },
      {
        label: '系统内置',
        prop: 'isBuiltin',
        valueType: 'select',
        options: YesOrNoOptions,
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
      isBuiltin: [{ required: true, message: '请选择系统内置', trigger: 'change' }],
    },
  }))

  function showCreate() {
    createVisible.value = true
  }

  async function confirmCreate(values: FieldValues) {
    await configApi.create(values)

    createValues.value = Object.create({})
    createVisible.value = false

    ElNotification.success({ title: '通知', message: '新增成功' })

    pageInstance.value.getList()
  }

  return {
    createVisible,
    createValues,
    createDialogProps,
    createFormProps,
    showCreate,
    confirmCreate,
  }
}
