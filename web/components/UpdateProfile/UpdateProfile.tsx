import { ElNotification } from 'element-plus'
import { pick } from 'es-toolkit/compat'
import { PlusDrawerForm, PlusDrawerFormProps } from 'plus-pro-components'

export default defineComponent({
  name: 'UpdateProfile',
  setup() {
    const visible = ref(false)
    const formModel = ref({})
    const confirmLoading = ref(false)

    const drawerProps = computed<PlusDrawerFormProps>(() => {
      return {
        title: '更新个人信息',
        confirmLoading: unref(confirmLoading),
        form: {
          labelWidth: 80,
          labelPosition: 'right',
          columns: [
            {
              label: '用户昵称',
              prop: 'nickName',
            },
            {
              label: '手机',
              prop: 'phone',
            },
            {
              label: '邮箱',
              prop: 'email',
            },
            {
              label: '性别',
              prop: 'sex',
              valueType: 'select',
              options: SexDict.options(),
            },
          ],
          rules: {
            sex: { required: true, message: '请选择性别', trigger: 'blur' },
          },
        },
        closeOnClickModal: true,
      }
    })

    function open() {
      visible.value = true
      confirmLoading.value = true

      currentUserApi.getProfile()
        .then((res) => {
          Object.assign(formModel.value, pick(res, ['nickName', 'phone', 'email', 'sex']))
        })
        .finally(() => {
          confirmLoading.value = false
        })
    }

    function handleConfirm(values: any) {
      confirmLoading.value = true

      currentUserApi.updateProfile(values)
        .then(() => {
          visible.value = false
          ElNotification.success({ title: '通知', message: '修改成功' })
        })
        .finally(() => {
          confirmLoading.value = false
        })
    }

    return {
      visible,
      confirmLoading,
      formModel,
      drawerProps,
      open,
      handleConfirm,
    }
  },
  render() {
    return (
      <PlusDrawerForm
        v-model:visible={this.visible}
        v-model={this.formModel}
        {...this.drawerProps}
        onConfirm={this.handleConfirm}
      >
      </PlusDrawerForm>
    )
  },
})
