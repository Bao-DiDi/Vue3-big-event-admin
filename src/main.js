import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import pinia from './stores'

import '@/assets/main.scss'

const app = createApp(App)

app.use(pinia) // Pinia独立维护
app.use(router)

app.mount('#app')
