<template>
  <div class="bg-white rounded-2xl shadow-xl p-8 animate-fade-in animation-delay-400">
    <div class="flex items-center mb-6">
      <div class="h-12 w-12 rounded-xl bg-cyan-100 flex items-center justify-center">
        <ShieldLockIcon class="h-6 w-6 text-cyan-600" />
      </div>
      <h2 class="text-2xl font-semibold ml-4 text-gray-900">Paramètres RGPD</h2>
    </div>

    <div class="space-y-6">
      <section>
        <h3 class="text-xl font-semibold text-gray-900 mb-4">Droits des Utilisateurs</h3>
        <p class="text-gray-600 mb-4">
          Conformément au Règlement Général de Protection des Données (RGPD), vous disposez de droits sur vos données personnelles.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <button 
            @click="exportData"
            class="flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-cyan-50 to-cyan-100 hover:from-cyan-100 hover:to-cyan-200 text-cyan-800 rounded-xl border border-cyan-200 transition duration-200"
            :disabled="isLoading"
          >
            <DownloadIcon class="h-5 w-5 mr-2" />
            <span>Exporter mes données</span>
          </button>
          
          <button 
            @click="confirmDelete = true"
            class="flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 text-red-800 rounded-xl border border-red-200 transition duration-200"
          >
            <TrashIcon class="h-5 w-5 mr-2" />
            <span>Supprimer mon compte</span>
          </button>
        </div>
      </section>

      <section class="pt-4 border-t border-gray-100">
        <h3 class="text-xl font-semibold text-gray-900 mb-4">Consentements</h3>
        
        <div v-for="(consent, index) in consentSettings" :key="index" class="mb-4 p-4 border border-gray-100 rounded-lg">
          <div class="flex items-start">
            <div class="flex h-6 items-center">
              <input 
                :id="`consent-${index}`" 
                type="checkbox"
                v-model="consent.value"
                @change="updateConsent(consent)"
                class="h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-600"
              />
            </div>
            <div class="ml-3 text-sm leading-6">
              <label :for="`consent-${index}`" class="font-medium text-gray-900">{{ consent.label }}</label>
              <p class="text-gray-500">{{ consent.description }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Delete Account Confirmation Modal -->
    <div v-if="confirmDelete" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-2xl p-8 max-w-lg w-full mx-4">
        <h3 class="text-2xl font-bold text-red-600 mb-4">Confirmation de suppression</h3>
        <p class="text-gray-600 mb-6">
          Êtes-vous sûr de vouloir supprimer définitivement votre compte et toutes vos données associées ? Cette action est irréversible.
        </p>
        <div class="flex flex-col sm:flex-row gap-4">
          <button 
            @click="confirmDelete = false"
            class="flex-1 py-3 px-6 rounded-xl border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
          >
            Annuler
          </button>
          <button 
            @click="deleteAccount"
            class="flex-1 py-3 px-6 rounded-xl bg-red-600 text-white hover:bg-red-700"
            :disabled="isDeleting"
          >
            {{ isDeleting ? 'Suppression...' : 'Confirmer la suppression' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { ArrowDownTrayIcon as DownloadIcon, ShieldCheckIcon as ShieldLockIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router'

const API_URL = 'http://localhost:8000'

const auth = useAuthStore()
const router = useRouter()
const isLoading = ref(false)
const isDeleting = ref(false)
const confirmDelete = ref(false)

const consentSettings = ref([
  {
    id: 'marketing',
    label: 'Communications marketing',
    description: 'J\'accepte de recevoir des emails concernant les nouveaux produits et offres promotionnelles.',
    value: false
  },
  {
    id: 'analytics',
    label: 'Analyses et statistiques',
    description: 'J\'accepte que mes données de navigation soient utilisées pour améliorer le service.',
    value: false
  },
  {
    id: 'thirdparty',
    label: 'Partage avec des tiers',
    description: 'J\'accepte que mes données soient partagées avec des partenaires de confiance.',
    value: false
  }
])

onMounted(async () => {
  // Load user's consent settings from the backend
  try {
    if (!auth.token) {
      return
    }
    
    const response = await fetch(`${API_URL}/gdpr/consent`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${auth.token}`
      }
    })
    
    if (!response.ok) {
      throw new Error('Failed to load consent settings')
    }
    
    const userConsents = await response.json()
    
    // Update local consent settings based on database values
    consentSettings.value = consentSettings.value.map(consent => {
      const userConsent = userConsents.find(c => c.purpose === consent.id)
      return {
        ...consent,
        value: userConsent ? userConsent.granted : false
      }
    })
  } catch (error) {
    console.error('Failed to load consent settings:', error)
  }
})

const updateConsent = async (consent) => {
  try {
    if (!auth.token) {
      return
    }
    
    const response = await fetch(`${API_URL}/gdpr/consent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token}`
      },
      body: JSON.stringify({
        purpose: consent.id,
        granted: consent.value
      })
    })
    
    if (!response.ok) {
      throw new Error('Failed to update consent')
    }
    
    console.log(`Consent for ${consent.id} updated to ${consent.value}`)
  } catch (error) {
    console.error('Error updating consent:', error)
    // Reset the checkbox to its previous state
    consent.value = !consent.value
  }
}

const exportData = async () => {
  try {
    isLoading.value = true
    
    if (!auth.token) {
      return
    }
    
    const response = await fetch(`${API_URL}/gdpr/export`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${auth.token}`
      }
    })
    
    if (!response.ok) {
      throw new Error('Failed to export data')
    }
    
    const data = await response.json()
    
    // Create a downloadable file with the user's data
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `your-data-${new Date().toISOString().slice(0, 10)}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
  } catch (error) {
    console.error('Error exporting data:', error)
  } finally {
    isLoading.value = false
  }
}

const deleteAccount = async () => {
  try {
    isDeleting.value = true
    
    if (!auth.token) {
      return
    }
    
    const response = await fetch(`${API_URL}/gdpr/delete`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${auth.token}`
      }
    })
    
    if (!response.ok) {
      throw new Error('Failed to delete account')
    }
    
    // Log the user out and redirect to home page
    auth.logout()
    router.push('/')
    
  } catch (error) {
    console.error('Error deleting account:', error)
    confirmDelete.value = false
  } finally {
    isDeleting.value = false
  }
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

.animation-delay-400 {
  animation-delay: 0.4s;
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