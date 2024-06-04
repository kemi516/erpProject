import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
//routes
import router from "./routes/index";

//pinia
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const pinia = createPinia()

// createApp(App).mount('#app')
const app = createApp(App)

//routes 
app.use(router)

//pinia
app.use(pinia)
app.use(ElementPlus)
app.mount('#app')