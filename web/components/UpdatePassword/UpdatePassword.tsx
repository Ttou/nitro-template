export default defineComponent({
  name: 'UpdatePassword',
  setup() {
    const visible = ref(false)
    const values = ref<UpdateCurrentUserPasswordDtoType>({})

    const dialogProps = computed<PlusDialogProps>(() => {
      return {
        title: '修改密码',
      }
    })

    const formProps = computed<PlusFormProps>(() => {
      return {
        columns: [
          {
            label: '旧密码',
            prop: 'oldPassword',
          },
          {
            label: '新密码',
            prop: 'newPassword',
          },
          {
            label: '确认密码',
            prop: 'confirmPassword',
          },
        ],
      }
    })

    function open() {
      visible.value = true
    }

    return {
      visible,
      values,
      dialogProps,
      formProps,
      open,
    }
  },
  render() {
    return (
      <PlusDialogForm v-model:visible={this.visible} v-model={this.values} dialog={this.dialogProps} form={this.formProps} />
    )
  },
})
