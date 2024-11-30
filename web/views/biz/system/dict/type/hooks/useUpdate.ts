import { ElNotification } from 'element-plus'
import { FieldValues, PlusDialogProps, PlusFormProps, PlusPageInstance } from 'plus-pro-components'
import { Ref } from 'vue'

interface UseEditParams {
  pageInstance: Ref<PlusPageInstance>
}

export function useUpdate({ pageInstance }: UseEditParams) {
  const updateVisible = ref(false)
  const updateValues = ref({})

  const updateDialogProps = computed<PlusDialogProps>(() => ({
    title: '编辑字典类型',
    width: '700px',
  }))

  // @ts-ignore
  const updateFormProps = computed<PlusFormProps>(() => ({
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
      dictName: [{ required: true, message: '请输入字典名称', trigger: 'blur' }],
      dictType: [{ required: true, message: '请输入字典类型', trigger: 'blur' }],
      isAvailable: [{ required: true, message: '请选择是否可用', trigger: 'change' }],
    },
  }))

  function showUpdate(params) {
    Object.assign(updateValues.value, params)
    updateVisible.value = true
  }

  async function confirmUpdate(values: FieldValues) {
    await dictTypeApi.update(values)

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
