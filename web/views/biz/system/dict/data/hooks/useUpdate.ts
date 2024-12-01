import { ElNotification } from 'element-plus'
import { FieldValues, PlusDialogProps, PlusFormProps, PlusPageInstance } from 'plus-pro-components'
import { ComputedRef, Ref } from 'vue'

interface UseUpdateParams {
  pageInstance: Ref<PlusPageInstance>
  dictType: ComputedRef<string>
}

export function useUpdate({ pageInstance, dictType }: UseUpdateParams) {
  const updateVisible = ref(false)
  const updateValues = ref({})

  const updateDialogProps = computed<PlusDialogProps>(() => ({
    title: '编辑字典数据',
    width: '700px',
  }))

  // @ts-ignore
  const updateFormProps = computed<PlusFormProps>(() => ({
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
        fieldProps: {
          disabled: true,
        },
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

  function showUpdate(params) {
    Object.assign(updateValues.value, params)
    updateVisible.value = true
  }

  async function confirmUpdate(values: FieldValues) {
    await dictTypeApi.update({
      ...values,
      dictType: unref(dictType),
    })

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
