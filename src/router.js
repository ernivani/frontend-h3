import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from './stores/auth'
import LoginPage from './pages/LoginPage.vue'
import RegisterPage from './pages/RegisterPage.vue'
import HomePage from './pages/HomePage.vue'
import DashboardPage from './pages/DashboardPage.vue'

const routes = [
  {
    path: '/login',
    component: LoginPage,
    meta: { requiresGuest: true }
  },
  {
    path: '/register',
    component: RegisterPage,
    meta: { requiresGuest: true }
  },
  {
    path: '/',
    component: HomePage,
    meta: { requiresAuth: false }
  },
  {
    path: '/dashboard',
    component: DashboardPage,
    meta: { requiresAuth: true }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresGuest && auth.isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router 