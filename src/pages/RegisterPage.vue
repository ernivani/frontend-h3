<template>
  <MainLayout>
    <div class="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-bold mb-6">Inscription</h2>
      <form @submit.prevent="handleRegister">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
            Nom
          </label>
          <input
            v-model="name"
            type="text"
            id="name"
            autocomplete="name"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            :class="{ 'border-red-500': error }"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input
            v-model="email"
            type="email"
            id="email"
            autocomplete="email"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            :class="{ 'border-red-500': error }"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Mot de passe
          </label>
          <input
            v-model="password"
            type="password"
            id="password"
            autocomplete="new-password"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            :class="{ 'border-red-500': error }"
            required
          />
        </div>

        <div v-if="error" class="mb-4 text-red-500 text-sm">
          {{ error }}
        </div>

        <button
          type="submit"
          class="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50"
          :disabled="isLoading"
        >
          <span v-if="isLoading">Inscription en cours...</span>
          <span v-else>S'inscrire</span>
        </button>

        <div class="mt-4 text-center text-sm text-gray-600">
          Déjà un compte ?
          <router-link to="/login" class="text-blue-500 hover:text-blue-600">
            Se connecter
          </router-link>
        </div>
      </form>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import MainLayout from '../layouts/MainLayout.vue'

const router = useRouter()
const auth = useAuthStore()

const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const isLoading = ref(false)

const handleRegister = async () => {
  error.value = ''
  isLoading.value = true
  
  try {
    await auth.register(name.value, email.value, password.value)
    router.push('/dashboard')
  } catch (err) {
    error.value = err.response?.data?.message || 'Une erreur est survenue lors de l\'inscription'
  } finally {
    isLoading.value = false
  }
}
</script> 