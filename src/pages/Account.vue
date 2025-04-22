<template>
  <div class="min-h-screen bg-gradient-to-b from-cyan-50 to-white">
    <!-- Hero Section -->
    <div class="relative overflow-hidden">
      <!-- Cercles décoratifs animés -->
      <div class="absolute top-0 left-0 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div class="absolute top-0 right-0 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div class="absolute -bottom-8 left-20 w-96 h-96 bg-cyan-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div class="relative max-w-7xl mx-auto pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-4xl mx-auto">
          <h1 class="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 mb-6 animate-fade-in">
            Mon Compte
          </h1>
          <p class="text-xl text-gray-600 animate-fade-in animation-delay-200 max-w-2xl mx-auto">
            Gérez vos informations personnelles et vos paramètres de sécurité
          </p>
        </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-16">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in animation-delay-400">
        <!-- Personal Information Card -->
        <div class="bg-white rounded-2xl shadow-xl p-8 transform transition duration-300 hover:scale-105">
          <div class="flex items-center mb-6">
            <div class="h-12 w-12 rounded-xl bg-cyan-100 flex items-center justify-center">
              <UserIcon class="h-6 w-6 text-cyan-600" />
            </div>
            <h2 class="text-2xl font-semibold ml-4 text-gray-900">Informations Personnelles</h2>
          </div>
          
          <div class="space-y-6">
            <div class="flex flex-col">
              <span class="text-sm font-medium text-gray-500">Nom</span>
              <span class="mt-1 text-lg text-gray-900">{{ user.name }}</span>
            </div>
            <div class="flex flex-col">
              <span class="text-sm font-medium text-gray-500">Email</span>
              <span class="mt-1 text-lg text-gray-900">{{ user.email }}</span>
            </div>
          </div>

          <button 
            @click="editProfile"
            class="mt-8 w-full text-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transform transition"
          >
            Modifier le profil
          </button>
        </div>

        <!-- Security Card -->
        <div class="bg-white rounded-2xl shadow-xl p-8 transform transition duration-300 hover:scale-105">
          <div class="flex items-center mb-6">
            <div class="h-12 w-12 rounded-xl bg-cyan-100 flex items-center justify-center">
              <ShieldCheckIcon class="h-6 w-6 text-cyan-600" />
            </div>
            <h2 class="text-2xl font-semibold ml-4 text-gray-900">Sécurité</h2>
          </div>

          <div class="space-y-6">
            <div class="flex flex-col">
              <span class="text-sm font-medium text-gray-500">Dernière connexion</span>
              <span class="mt-1 text-lg text-gray-900">{{ lastLoginDate }}</span>
            </div>
            <div class="flex flex-col">
              <span class="text-sm font-medium text-gray-500">Authentification à deux facteurs</span>
              <span class="mt-1 text-lg text-gray-900">{{ twoFactorEnabled ? 'Activée' : 'Désactivée' }}</span>
            </div>
          </div>

          <button 
            @click="changePassword"
            class="mt-8 w-full text-center px-6 py-3 border-2 border-cyan-500 text-base font-medium rounded-xl text-cyan-600 bg-white hover:bg-cyan-50 transform transition"
          >
            Changer le mot de passe
          </button>
        </div>
      </div>
      
      <!-- GDPR Settings Section -->
      <div class="mt-8">
        <GDPRSettings />
      </div>
    </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import { UserIcon, ShieldCheckIcon } from '@heroicons/vue/24/outline'
import GDPRSettings from '../components/GDPRSettings.vue'

const auth = useAuthStore()
const router = useRouter()
const user = ref({
  name: auth.user?.name || 'John Doe',
  email: auth.user?.email || 'john@example.com'
})

const lastLoginDate = ref(new Date().toLocaleDateString('fr-FR'))
const twoFactorEnabled = ref(false)

const editProfile = () => {
  // TODO: Implement edit profile functionality
  console.log('Edit profile clicked')
}

const changePassword = () => {
  // TODO: Implement change password functionality
  console.log('Change password clicked')
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

.animation-delay-400 {
  animation-delay: 0.4s;
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