import 'element-plus/dist/index.css'
import 'plus-pro-components/index.css'
import './assets/styles/main.css'

import ElementPlus from 'element-plus'
import PlusProComponents from 'plus-pro-components'
import { createApp } from 'vue'

import App from './App'
import router from './router'
import store from './store'

const app = createApp(App)

app.use(ElementPlus)
app.use(PlusProComponents)

app.use(store)
app.use(router)

app.mount('#app')
