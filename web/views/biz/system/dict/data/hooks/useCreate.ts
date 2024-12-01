import { ElNotification } from 'element-plus'
import { FieldValues, PlusDialogProps, PlusFormProps, PlusPageInstance } from 'plus-pro-components'
import { ComputedRef, Ref } from 'vue'

interface UseCreateParams {
  pageInstance: Ref<PlusPageInstance>
  dictType: ComputedRef<string>
}

export function useCreate({ pageInstance, dictType }: UseCreateParams) {
  const createVisible = ref(false)
  const createValues = ref({})

  const createDialogProps = computed<PlusDialogProps>(() => ({
    title: '新增字典数据',
    width: '700px',
  }))

  const createFormProps = computed<PlusFormProps>(() => ({
    labelWidth: '120px',
    labelPosition: 'right',
    columns: [
      {
        label: '字典标签',
        prop: 'dictLabel',
      },
      {
        label: '字典值',
        prop: 'dictValue',
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
      dictLabel: [{ required: true, message: '请输入字典标签', trigger: 'blur' }],
      dictValue: [{ required: true, message: '请输入字典值', trigger: 'blur' }],
      isAvailable: [{ required: true, message: '请选择是否可用', trigger: 'change' }],
    },
  }))

  function showCreate() {
    createVisible.value = true
  }

  async function confirmCreate(values: FieldValues) {
    await dictDataApi.create({
      ...values,
      dictType: unref(dictType),
    })

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
