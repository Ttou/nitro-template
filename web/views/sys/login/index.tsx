import './index.css'

import { ElButton, FormRules } from 'element-plus'

export default defineComponent({
  name: 'LoginView',
  setup() {
    const router = useRouter()
    const userStore = useUserStore()

    const loading = ref(false)
    const formModel = ref<LoginDtoType>({
      userName: '',
      password: '',
    })

    const formRules = ref<FormRules<LoginDtoType>>({
      userName: [{ required: true, message: '请输入账号', trigger: 'blur' }],
      password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    })

    const formColumns = computed<PlusColumn[]>(() => [
      {
        label: '账号',
        hasLabel: false,
        prop: 'userName',
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

        router.replace({
          path: '/',
          // TODO
        })
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
            size="large"
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
