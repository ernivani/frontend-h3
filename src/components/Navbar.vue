<template>
  <nav class="bg-white shadow">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <!-- Logo -->
          <div class="flex-shrink-0 flex items-center">
            <router-link to="/" class="text-xl font-bold text-primary">
              Cyna
            </router-link>
          </div>

          <!-- Navigation links -->
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <router-link
              to="/"
              class="inline-flex items-center px-1 pt-1 text-sm font-medium"
              :class="[
                $route.path === '/'
                  ? 'border-b-2 border-primary text-gray-900'
                  : 'border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              ]"
            >
              Accueil
            </router-link>

            <router-link
              to="/products"
              class="inline-flex items-center px-1 pt-1 text-sm font-medium"
              :class="[
                $route.path.startsWith('/products')
                  ? 'border-b-2 border-primary text-gray-900'
                  : 'border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              ]"
            >
              Produits
            </router-link>

          </div>
        </div>

        <!-- Right side -->
        <div class="hidden sm:ml-6 sm:flex sm:items-center">
          <!-- Profile dropdown -->
          <template v-if="auth.isAuthenticated">
            <div class="ml-3 relative">
              <div>
                <button
                  @click="showProfileMenu = !showProfileMenu"
                  class="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  <span class="sr-only">Open user menu</span>
                  <img
                    class="h-8 w-8 rounded-full"
                    :src="auth.user?.avatar || 'https://ui-avatars.com/api/?name=' + auth.user?.name"
                    :alt="auth.user?.name"
                  />
                </button>
              </div>
              <div
                v-if="showProfileMenu"
                class="z-50 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
                role="menu"
              >
                <router-link
                  v-if="auth.isAdmin"
                  to="/admin"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Administration
                </router-link>
                <router-link
                  to="/account"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Mon compte
                </router-link>
                <router-link
                  to="/orders"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Mes commandes
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
          </template>
          <template v-else>
            <router-link
              to="/auth/login"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Connexion
            </router-link>
          </template>
        </div>

        <!-- Mobile menu button -->
        <div class="flex items-center sm:hidden">
          <button
            @click="showMobileMenu = !showMobileMenu"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                v-if="showMobileMenu"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="showMobileMenu" class="sm:hidden">
      <div class="pt-2 pb-3 space-y-1">
        <router-link
          to="/"
          class="block pl-3 pr-4 py-2 text-base font-medium"
          :class="[
            $route.path === '/'
              ? 'bg-primary-50 border-l-4 border-primary text-primary'
              : 'border-l-4 border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
          ]"
        >
          Accueil
        </router-link>

        <router-link
          to="/products"
          class="block pl-3 pr-4 py-2 text-base font-medium"
          :class="[
            $route.path.startsWith('/products')
              ? 'bg-primary-50 border-l-4 border-primary text-primary'
              : 'border-l-4 border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
          ]"
        >
          Produits
        </router-link>

      </div>

      <!-- Mobile menu profile section -->
      <div v-if="auth.isAuthenticated" class="pt-4 pb-3 border-t border-gray-200">
        <div class="flex items-center px-4">
          <div class="flex-shrink-0">
            <img
              class="h-10 w-10 rounded-full"
              :src="auth.user?.avatar || 'https://ui-avatars.com/api/?name=' + auth.user?.name"
              :alt="auth.user?.name"
            />
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-gray-800">{{ auth.user?.name }}</div>
            <div class="text-sm font-medium text-gray-500">{{ auth.user?.email }}</div>
          </div>
        </div>
        <div class="mt-3 space-y-1">
          <router-link
            v-if="auth.isAdmin"
            to="/admin"
            class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
          >
            Administration
          </router-link>
          <router-link
            to="/account"
            class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
          >
            Mon compte
          </router-link>
          <router-link
            to="/orders"
            class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
          >
            Mes commandes
          </router-link>
          <button
            @click="handleLogout"
            class="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
          >
            Déconnexion
          </button>
        </div>
      </div>
      <div v-else class="pt-4 pb-3 border-t border-gray-200">
        <div class="space-y-1">
          <router-link
            to="/auth/login"
            class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
          >
            Connexion
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const auth = useAuthStore()

const showMobileMenu = ref(false)
const showProfileMenu = ref(false)

async function handleLogout() {
  await auth.logout()
  router.push('/auth/login')
  showProfileMenu.value = false
  showMobileMenu.value = false
}
</script> 