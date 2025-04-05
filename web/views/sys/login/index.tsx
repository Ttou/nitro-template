import { Icon } from '@iconify/vue'
import { ElButton, FormRules } from 'element-plus'

import ImageCaptcha from '../../../components/ImageCaptcha/ImageCaptcha'
import * as styles from './index.css'

export default defineComponent({
  name: 'LoginView',
  setup() {
    const router = useRouter()
    const userStore = useUserStore()

    const loading = ref(false)
    const formModel = ref<ILoginDto>({
      userName: '',
      password: '',
      captchaId: '',
      captchaValue: '',
    })

    const formRules = ref<FormRules<ILoginDto>>({
      userName: [{ required: true, message: '请输入账号', trigger: 'blur' }],
      password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      captchaValue: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
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
      {
        label: '验证码',
        hasLabel: false,
        prop: 'captchaValue',
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
      <div class={styles.loginView}>
        <div class={styles.loginForm}>
          <div class={styles.loginFormHeader}>
            <Icon icon="ep:monitor" />
          </div>
          <PlusForm
            v-model={this.formModel}
            columns={this.formColumns}
            rules={this.formRules}
            onSubmit={this.handleLogin}
            size="large"
          >
            {{
              ['plus-field-captchaValue']: () => (
                <ImageCaptcha
                  v-model:captchaValue={this.formModel.captchaValue}
                  v-model:captchaId={this.formModel.captchaId}
                />
              ),
              ['footer']: ({ handleSubmit }) => (
                <div class={styles.loginFormFooter}>
                  <ElButton class={styles.loginBtn} type="primary" onClick={handleSubmit}>登录</ElButton>
                </div>
              ),
            }}
          </PlusForm>
        </div>
      </div>
    )
  },
})
