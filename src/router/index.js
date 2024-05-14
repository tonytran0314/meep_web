import { createRouter, createMemoryHistory } from 'vue-router'
import HomeView from '/src/views/HomeView.vue'
import LoginView from '/src/views/LoginView.vue'
import SignUpView from '/src/views/SignUpView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/login', component: LoginView },
  { path: '/signup', component: SignUpView }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router