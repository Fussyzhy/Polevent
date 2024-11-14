import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import '@/assets/main.scss'
import pinia from '@/stores/index'

const app = createApp(App)

app.use(pinia)
// app.use(createPinia())
app.use(router)

app.mount('#app')
