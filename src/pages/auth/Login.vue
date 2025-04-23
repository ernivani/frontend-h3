<template>
  <div class="min-h-screen bg-gradient-to-b from-cyan-50 to-white">
    <!-- Cercles décoratifs animés -->
    <div class="absolute top-0 left-0 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
    <div class="absolute top-0 right-0 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
    <div class="absolute -bottom-8 left-20 w-96 h-96 bg-cyan-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

    <div class="relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl animate-fade-in">
        <div>
          <h2 class="text-center text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
            Connexion à votre compte
          </h2>
          <p class="mt-2 text-center text-sm text-gray-600 animate-fade-in animation-delay-200">
            Ou
            <router-link to="/auth/register" class="font-medium text-cyan-500 hover:text-cyan-600">
              créez un nouveau compte
            </router-link>
          </p>
        </div>
        <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
          <div class="space-y-4">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                v-model="email"
                name="email"
                type="email"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent sm:text-sm"
                placeholder="votre@email.com"
              />
            </div>
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
              <input
                id="password"
                v-model="password"
                name="password"
                type="password"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent sm:text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                v-model="rememberMe"
                name="remember-me"
                type="checkbox"
                class="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-gray-300 rounded"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-700">
                Se souvenir de moi
              </label>
            </div>

            <div class="text-sm">
              <router-link to="/auth/forgot-password" class="font-medium text-cyan-500 hover:text-cyan-600">
                Mot de passe oublié ?
              </router-link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="loading"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transform transition"
            >
              <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  v-if="!loading"
                  class="h-5 w-5 text-cyan-200 group-hover:text-cyan-100"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <svg
                  v-else
                  class="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </span>
              {{ loading ? 'Connexion...' : 'Se connecter' }}
            </button>
          </div>
          
          <!-- Legal links -->
          <div class="mt-6 text-center text-xs text-gray-500">
            En vous connectant, vous acceptez nos 
            <router-link to="/terms-of-service" class="text-cyan-500 hover:text-cyan-600">
              Conditions Générales d'Utilisation
            </router-link>
            et nos
            <router-link to="/mentions-legales" class="text-cyan-500 hover:text-cyan-600">
              Mentions Légales
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const loading = ref(false)

async function handleSubmit() {
  loading.value = true
  
  try {
    const success = await auth.login(email.value, password.value)
    if (success) {
      router.push('/admin')
    } else {
      // TODO: Show error message
    }
  } catch (error) {
    console.error('Login error:', error)
    // TODO: Show error message
  } finally {
    loading.value = false
  }
}
</script>

<style>
.animate-blob {
  animation: blob 7s infinite;
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.animation-delay-200 {
  animation-delay: 0.2s;
}

@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 