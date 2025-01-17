<template>
  <MainLayout>
    <div class="space-y-6">
      <!-- En-tête -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h1 class="text-3xl font-bold">Tableau de bord</h1>
        <p class="text-gray-600 mt-2">Bienvenue, {{ auth.user?.name }}</p>
      </div>

      <!-- Profil -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-bold mb-4">Mon Profil</h2>
        <form @submit.prevent="handleUpdateProfile">
          <div class="space-y-4">
            <div>
              <label class="block text-gray-700 text-sm font-bold mb-2" for="profile-name">
                Nom
              </label>
              <input
                v-model="profileForm.name"
                type="text"
                id="profile-name"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                :class="{ 'border-red-500': error }"
                required
              />
            </div>
            <div>
              <label class="block text-gray-700 text-sm font-bold mb-2" for="profile-email">
                Email
              </label>
              <input
                v-model="profileForm.email"
                type="email"
                id="profile-email"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                :class="{ 'border-red-500': error }"
                required
              />
            </div>

            <div v-if="error" class="text-red-500 text-sm">
              {{ error }}
            </div>

            <div v-if="updateSuccess" class="text-green-500 text-sm">
              Profil mis à jour avec succès. Vous allez être redirigé vers la page de connexion...
            </div>

            <button
              type="submit"
              class="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50"
              :disabled="isLoading"
            >
              <span v-if="isLoading">Mise à jour en cours...</span>
              <span v-else>Mettre à jour le profil</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Statistiques -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-lg font-semibold text-gray-700">Projets actifs</h3>
          <p class="text-3xl font-bold text-blue-500 mt-2">3</p>
        </div>
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-lg font-semibold text-gray-700">Tâches en cours</h3>
          <p class="text-3xl font-bold text-green-500 mt-2">8</p>
        </div>
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-lg font-semibold text-gray-700">Tâches terminées</h3>
          <p class="text-3xl font-bold text-purple-500 mt-2">12</p>
        </div>
      </div>

      <!-- Activités récentes -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-bold mb-4">Activités récentes</h2>
        <div class="space-y-4">
          <div class="flex items-center justify-between border-b pb-4">
            <div>
              <p class="font-semibold">Mise à jour du projet Alpha</p>
              <p class="text-sm text-gray-600">Il y a 2 heures</p>
            </div>
            <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Projet</span>
          </div>
          <div class="flex items-center justify-between border-b pb-4">
            <div>
              <p class="font-semibold">Tâche complétée : Intégration API</p>
              <p class="text-sm text-gray-600">Il y a 5 heures</p>
            </div>
            <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Tâche</span>
          </div>
          <div class="flex items-center justify-between">
            <div>
              <p class="font-semibold">Nouveau projet créé : Beta</p>
              <p class="text-sm text-gray-600">Il y a 1 jour</p>
            </div>
            <span class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Nouveau</span>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import MainLayout from '../layouts/MainLayout.vue'

const router = useRouter()
const auth = useAuthStore()

const profileForm = ref({
  name: '',
  email: ''
})
const error = ref('')
const isLoading = ref(false)
const updateSuccess = ref(false)

onMounted(() => {
  if (auth.user) {
    profileForm.value.name = auth.user.name
    profileForm.value.email = auth.user.email
  }
})

const handleUpdateProfile = async () => {
  error.value = ''
  isLoading.value = true
  updateSuccess.value = false
  
  try {
    await auth.updateProfile({
      name: profileForm.value.name,
      email: profileForm.value.email
    })
    
    updateSuccess.value = true
    
    // Rediriger vers la page de connexion après 2 secondes
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  } catch (err) {
    error.value = err.response?.data?.message || 'Une erreur est survenue lors de la mise à jour du profil'
  } finally {
    isLoading.value = false
  }
}
</script> 