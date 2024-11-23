import './index.css'

import { ElButton, FormRules } from 'element-plus'
import { PlusColumn, PlusForm } from 'plus-pro-components'

import { LoginDtoType } from '~/constants/dto/auth'

export default defineComponent({
  name: 'LoginView',
  setup() {
    const userStore = useUserStore()

    const loading = ref(false)
    const formModel = ref<LoginDtoType>({
      username: '',
      password: '',
    })

    const formRules = ref<FormRules<LoginDtoType>>({
      username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
      password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    })

    const formColumns = computed<PlusColumn[]>(() => [
      {
        label: '账号',
        hasLabel: false,
        prop: 'username',
        fieldProps: {
          placeholder: '请输入账号',
        },
      },
      {
        label: '密码',
        hasLabel: false,
        prop: 'password',
        fieldProps: {
          placeholder: '请输入密码',
          type: 'password',
          showPassword: true,
        },
      },
    ])

    async function handleLogin() {
      loading.value = true

      try {
        await userStore.login(formModel.value)

        loading.value = false
      }
      catch {
        loading.value = false
      }
    }

    return {
      loading,
      formModel,
      formRules,
      formColumns,
      handleLogin,
    }
  },
  render() {
    return (
      <div class="loginView">
        <div class="loginForm">
          <PlusForm
            v-model={this.formModel}
            columns={this.formColumns}
            rules={this.formRules}
            onSubmit={this.handleLogin}
          >
            {{
              footer: ({ handleSubmit }) => (
                <div class="footer">
                  <ElButton class="loginBtn" type="primary" onClick={handleSubmit}>登录</ElButton>
                </div>
              ),
            }}
          </PlusForm>
        </div>
      </div>
    )
  },
})
