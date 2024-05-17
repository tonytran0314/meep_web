import { createApp } from 'vue'
import App from './App.vue'

import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"

import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/md-dark-indigo/theme.css'
import Skeleton from 'primevue/skeleton'

import router from './router'

import './assets/config.scss'

const app = createApp(App)

app.use(router)
app.use(Toast)
app.use(PrimeVue)
app.component('Skeleton', Skeleton)
app.mount('#app')
