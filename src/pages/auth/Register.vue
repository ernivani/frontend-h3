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
            Créer un compte
          </h2>
          <p class="mt-2 text-center text-sm text-gray-600 animate-fade-in animation-delay-200">
            Ou
            <router-link to="/auth/login" class="font-medium text-cyan-500 hover:text-cyan-600">
              connectez-vous à votre compte existant
            </router-link>
          </p>
        </div>
        <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
          <div class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700">Nom complet</label>
              <input
                id="name"
                v-model="name"
                name="name"
                type="text"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent sm:text-sm"
                placeholder="John Doe"
              />
            </div>
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
            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
              <input
                id="confirmPassword"
                v-model="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent sm:text-sm"
                placeholder="••••••••"
              />
            </div>
            
            <!-- GDPR Consent Checkbox -->
            <div class="mt-4">
              <div class="flex items-start">
                <div class="flex h-6 items-center">
                  <input 
                    id="gdpr-consent" 
                    v-model="gdprConsent"
                    type="checkbox"
                    required
                    class="h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-600"
                  />
                </div>
                <div class="ml-3 text-sm leading-6">
                  <label for="gdpr-consent" class="font-medium text-gray-900">Consentement RGPD</label>
                  <p class="text-gray-500">
                    J'accepte que mes données personnelles soient traitées conformément à la 
                    <router-link to="/privacy-policy" class="text-cyan-600 hover:underline">politique de confidentialité</router-link>.
                  </p>
                </div>
              </div>
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
                >
                  <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
                </svg>
                <svg
                  v-else
                  class="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              {{ loading ? 'Création du compte...' : 'Créer un compte' }}
            </button>
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

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const gdprConsent = ref(false)
const loading = ref(false)

async function handleSubmit() {
  if (password.value !== confirmPassword.value) {
    // TODO: Show error message
    return
  }

  if (!gdprConsent.value) {
    // If user hasn't accepted GDPR terms
    alert("Vous devez accepter la politique de confidentialité pour créer un compte.");
    return;
  }

  loading.value = true
  
  try {
    const success = await auth.register({
      name: name.value,
      email: email.value,
      password: password.value
    })
    
    if (success) {
      // Record GDPR consent after successful registration
      try {
        await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/gdpr/consent`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.token}`
          },
          body: JSON.stringify({
            purpose: 'general_terms',
            granted: true
          })
        });
      } catch (error) {
        console.error('Failed to record consent:', error);
        // Continue even if consent recording fails
      }
      
      router.push('/admin')
    } else {
      // TODO: Show error message
    }
  } catch (error) {
    console.error('Register error:', error)
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