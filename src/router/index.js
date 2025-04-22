import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Home from '@/pages/Home.vue'
import Products from '@/pages/Products.vue'
import ProductDetails from '@/pages/ProductDetails.vue'
import Checkout from '@/pages/Checkout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import Account from '@/pages/Account.vue'
import Orders from '@/pages/Orders.vue'
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/products',
      name: 'products',
      component: Products
    },
    {
      path: '/products/:product',
      name: 'product-details',
      component: ProductDetails
    },
    {
      path: '/checkout/:product',
      name: 'checkout',
      component: Checkout
    },
    {
      path: '/account',
      name: 'account',
      component: Account,
      meta: { requiresAuth: true }
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders,
      meta: { requiresAuth: true }
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: PrivacyPolicyPage
    },
    {
      path: '/auth',
      redirect: '/auth/login',
      meta: { layout: AuthLayout },
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('../pages/auth/Login.vue')
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('../pages/auth/Register.vue')
        },
        {
          path: 'forgot-password',
          name: 'forgot-password',
          component: () => import('../pages/auth/ForgotPassword.vue')
        },
        {
          path: 'reset-password',
          name: 'reset-password',
          component: () => import('../pages/auth/ResetPassword.vue')
        }
      ]
    },
    {
      path: '/admin',
      component: () => import('../layouts/AdminLayout.vue'),
      meta: { requiresAuth: true, requiresAdmin: true },
      children: [
        {
          path: '',
          redirect: '/admin/dashboard'
        },
        {
          path: 'dashboard',
          name: 'admin-dashboard',
          component: () => import('../pages/admin/Dashboard.vue')
        },
        {
          path: 'orders',
          name: 'admin-orders',
          component: () => import('../pages/admin/Orders.vue')
        },
        {
          path: 'users',
          name: 'admin-users',
          component: () => import('../pages/admin/Users.vue')
        },
        {
          path: 'profile',
          name: 'admin-profile',
          component: () => import('../pages/admin/Profile.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next('/auth/login')
  } else if (to.meta.requiresAdmin && !auth.isAdmin) {
    next('/')
  } else {
    next()
  }
})

export default router 