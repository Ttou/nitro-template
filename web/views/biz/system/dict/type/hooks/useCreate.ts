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
    title: '新增字典类型',
    width: '700px',
  }))

  const createFormProps = computed<PlusFormProps>(() => ({
    labelWidth: '120px',
    labelPosition: 'right',
    columns: [
      {
        label: '字典名称',
        prop: 'dictName',
      },
      {
        label: '字典类型',
        prop: 'dictType',
      },
      {
        label: '是否可用',
        prop: 'isAvailable',
        valueType: 'select',
        options: YesOrNo.options,
      },
      {
        label: '备注',
        prop: 'remark',
      },
    ],
    rules: {
      dictName: [{ required: true, message: '请输入字典名称', trigger: 'blur' }],
      dictType: [{ required: true, message: '请输入字典类型', trigger: 'blur' }],
      isAvailable: [{ required: true, message: '请选择是否可用', trigger: 'change' }],
    },
  }))

  function showCreate() {
    createVisible.value = true
  }

  async function confirmCreate(values: FieldValues) {
    await dictTypeApi.create(values)

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
