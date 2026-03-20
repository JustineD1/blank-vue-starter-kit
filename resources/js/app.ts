import { createApp } from 'vue'
import router from './router'
import App from './home/App.vue'

const app = createApp(App)
app.use(router) // ← this registers <router-view> and <router-link>
app.mount('#app')