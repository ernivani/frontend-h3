<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <div class="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
      <div class="flex items-center justify-center h-16 px-4 bg-primary">
        <router-link to="/admin" class="text-white text-xl font-bold">
          Admin Panel
        </router-link>
      </div>
      <nav class="mt-5 px-2">
        <router-link
          to="/admin/dashboard"
          class="group flex items-center px-2 py-2 text-base font-medium rounded-md"
          :class="[
            $route.path.startsWith('/admin/dashboard')
              ? 'bg-primary-50 text-primary'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          ]"
        >
          <svg
            class="mr-4 flex-shrink-0 h-6 w-6"
            :class="[
              $route.path.startsWith('/admin/dashboard')
                ? 'text-primary'
                : 'text-gray-400 group-hover:text-gray-500'
            ]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Dashboard
        </router-link>

        <router-link
          to="/admin/products"
          class="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md"
          :class="[
            $route.path.startsWith('/admin/products')
              ? 'bg-primary-50 text-primary'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          ]"
        >
          <svg
            class="mr-4 flex-shrink-0 h-6 w-6"
            :class="[
              $route.path.startsWith('/admin/products')
                ? 'text-primary'
                : 'text-gray-400 group-hover:text-gray-500'
            ]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
          Produits
        </router-link>

        <router-link
          to="/admin/orders"
          class="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md"
          :class="[
            $route.path.startsWith('/admin/orders')
              ? 'bg-primary-50 text-primary'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          ]"
        >
          <svg
            class="mr-4 flex-shrink-0 h-6 w-6"
            :class="[
              $route.path.startsWith('/admin/orders')
                ? 'text-primary'
                : 'text-gray-400 group-hover:text-gray-500'
            ]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          Commandes
        </router-link>

        <router-link
          to="/admin/users"
          class="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md"
          :class="[
            $route.path.startsWith('/admin/users')
              ? 'bg-primary-50 text-primary'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          ]"
        >
          <svg
            class="mr-4 flex-shrink-0 h-6 w-6"
            :class="[
              $route.path.startsWith('/admin/users')
                ? 'text-primary'
                : 'text-gray-400 group-hover:text-gray-500'
            ]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          Utilisateurs
        </router-link>
      </nav>
    </div>

    <!-- Main content -->
    <div class="pl-64 flex flex-col flex-1">
      <!-- Top navigation -->
      <div class="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
        <div class="flex-1 px-4 flex justify-between">
          <div class="flex-1 flex"></div>
          <div class="ml-4 flex items-center md:ml-6">
            <!-- Profile dropdown -->
            <div class="ml-3 relative">
              <div>
                <button
                  @click="showProfileMenu = !showProfileMenu"
                  class="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  <span class="sr-only">Open user menu</span>
                  <img
                    class="h-8 w-8 rounded-full"
                    :src="user?.avatar || 'https://ui-avatars.com/api/?name=' + user?.name"
                    :alt="user?.name"
                  />
                </button>
              </div>
              <div
                v-if="showProfileMenu"
                class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
                role="menu"
              >
                <router-link
                  to="/admin/profile"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Mon profil
                </router-link>
                <button
                  @click="handleLogout"
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Déconnexion
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Page content -->
      <main class="flex-1">
        <div class="py-6">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <router-view></router-view>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()
const showProfileMenu = ref(false)
const user = auth.user

onMounted(() => {
  if (!auth.isAuthenticated || !auth.isAdmin) {
    router.push('/auth/login')
  }
})

async function handleLogout() {
  await auth.logout()
  router.push('/auth/login')
}
</script> 