<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Navigation -->
    <nav class="bg-white shadow-lg">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between h-16">
          <div class="flex">
            <router-link to="/" class="flex items-center">
              <span class="text-xl font-bold">H3</span>
            </router-link>
          </div>
          <div class="flex items-center space-x-4">
            <template v-if="auth.isAuthenticated">
              <router-link 
                to="/dashboard" 
                class="text-gray-700 hover:text-gray-900 px-3 py-2"
                :class="{ 'text-blue-600': $route.path === '/dashboard' }"
              >
                Tableau de bord
              </router-link>
              <button @click="logout" class="text-gray-700 hover:text-gray-900">
                Déconnexion
              </button>
            </template>
            <template v-else>
              <router-link 
                to="/login" 
                class="text-gray-700 hover:text-gray-900 px-3 py-2"
                :class="{ 'text-blue-600': $route.path === '/login' }"
              >
                Connexion
              </router-link>
              <router-link 
                to="/register" 
                class="text-gray-700 hover:text-gray-900 px-3 py-2"
                :class="{ 'text-blue-600': $route.path === '/register' }"
              >
                Inscription
              </router-link>
            </template>
          </div>
        </div>
      </div>
    </nav>

    <!-- Page Content -->
    <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <slot></slot>
    </main>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()

const logout = () => {
  auth.logout()
}
</script> 