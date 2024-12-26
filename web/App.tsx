import { ElConfigProvider, ElWatermark } from 'element-plus'
import { RouterView } from 'vue-router'

import { useElementPlusConfig } from './hooks/useElementPlusConfig'

export default defineComponent({
  name: 'App',
  setup() {
    const config = useElementPlusConfig()

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
