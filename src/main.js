import { createApp } from 'vue'
import App from './App.vue'

import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"

import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/md-dark-indigo/theme.css'
import Skeleton from 'primevue/skeleton'

import router from './router'

import './assets/config.scss'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUser, faRightFromBracket, faMagnifyingGlass, faX } from '@fortawesome/free-solid-svg-icons'

const app = createApp(App)

/* add icons to the library */
library.add(faUser, faRightFromBracket, faMagnifyingGlass, faX)
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)
app.use(Toast)
app.use(PrimeVue)
app.component('Skeleton', Skeleton)
app.mount('#app')
