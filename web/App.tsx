import { ConfigProviderProps, ElConfigProvider, ElWatermark } from 'element-plus'
import en from 'element-plus/es/locale/lang/en'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import plusEn from 'plus-pro-components/es/locale/lang/en'
import plusZhCn from 'plus-pro-components/es/locale/lang/zh-cn'
import { RouterView } from 'vue-router'

const zhCnLocales = {
  ...zhCn,
  ...plusZhCn,
}
const enLocales = {
  ...en,
  ...plusEn,
}

export default defineComponent({
  name: 'App',
  setup() {
    const config = ref<Partial<ConfigProviderProps>>({
      size: 'default',
      locale: zhCnLocales, // 默认中文
    })

    return {
      config,
    }
  },
  render() {
    return (
      <ElConfigProvider {...this.config}>
        <RouterView />
      </ElConfigProvider>
    )
  },
})
