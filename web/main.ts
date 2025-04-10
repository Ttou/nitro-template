import 'element-plus/dist/index.css'
import 'plus-pro-components/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './assets/styles/main.css'
import './assets/styles/reset.css'
import './assets/styles/transition.css'
import './fetch-polyfill'

import ElementPlus from 'element-plus'
import PlusProComponents from 'plus-pro-components'
import { createApp } from 'vue'

import App from './App'
import { useIcons } from './hooks/useIcons'
import i18n from './i18n'

const app = createApp(App)

app.use(ElementPlus)
app.use(PlusProComponents)

app.use(store)
app.use(router)
app.use(i18n)

useIcons()

app.mount('#app')
