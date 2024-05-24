import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '/src/views/HomeView.vue'
import LoginView from '/src/views/LoginView.vue'
import SignUpView from '/src/views/SignUpView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/chat', component: HomeView },
  { path: '/chat/:conversationId([0-9]+)', component: HomeView},
  { path: '/login', component: LoginView },
  { path: '/signup', component: SignUpView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router