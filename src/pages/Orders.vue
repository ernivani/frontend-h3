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
            Mes Commandes
          </h1>
          <p class="text-xl text-gray-600 animate-fade-in animation-delay-200 max-w-2xl mx-auto">
            Suivez et gérez vos commandes en cours et passées
          </p>
        </div>
      </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div v-if="loading" class="text-center py-12 animate-fade-in">
        <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-600 mx-auto"></div>
        <p class="mt-4 text-gray-600">Chargement de vos commandes...</p>
      </div>

      <div v-else-if="orders.length === 0" class="text-center py-12 animate-fade-in">
        <div class="h-24 w-24 mx-auto mb-6 text-gray-400">
          <ShoppingBagIcon class="h-full w-full" />
        </div>
        <h3 class="text-xl font-medium text-gray-900 mb-2">Aucune commande</h3>
        <p class="text-gray-600 mb-8">Vous n'avez pas encore passé de commande</p>
        <router-link 
          to="/products" 
          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transform transition hover:scale-105"
        >
          Découvrir nos produits
        </router-link>
      </div>

      <div v-else class="space-y-8 animate-fade-in animation-delay-400">
        <div 
          v-for="order in orders" 
          :key="order.id" 
          class="bg-white rounded-2xl shadow-xl overflow-hidden transform transition duration-300 hover:scale-105"
        >
          <div class="p-6 sm:p-8">
            <div class="flex flex-wrap items-center justify-between mb-6">
              <div class="flex items-center mb-4 sm:mb-0">
                <div class="h-12 w-12 rounded-xl bg-cyan-100 flex items-center justify-center">
                  <ShoppingCartIcon class="h-6 w-6 text-cyan-600" />
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-semibold text-gray-900">Commande #{{ order.id }}</h3>
                  <p class="text-sm text-gray-500">{{ formatDate(order.date) }}</p>
                </div>
              </div>
              <span 
                :class="{
                  'bg-green-100 text-green-800': order.status === 'completed',
                  'bg-yellow-100 text-yellow-800': order.status === 'processing',
                  'bg-blue-100 text-blue-800': order.status === 'shipped'
                }"
                class="px-4 py-2 rounded-full text-sm font-medium"
              >
                {{ formatStatus(order.status) }}
              </span>
            </div>

            <div class="border-t border-gray-200 pt-6">
              <div class="space-y-4">
                <div v-for="item in order.items" :key="item.id" class="flex items-center">
                  <img 
                    :src="item.image" 
                    :alt="item.name"
                    class="h-16 w-16 object-cover rounded-xl"
                  >
                  <div class="ml-4 flex-1">
                    <h4 class="text-sm font-medium text-gray-900">{{ item.name }}</h4>
                    <p class="text-sm text-gray-500">Quantité: {{ item.quantity }}</p>
                  </div>
                  <p class="text-sm font-medium text-gray-900">{{ formatPrice(item.price) }}</p>
                </div>
              </div>

              <div class="mt-6 pt-6 border-t border-gray-200">
                <div class="flex justify-between items-center">
                  <span class="text-base font-medium text-gray-900">Total</span>
                  <span class="text-xl font-semibold text-gray-900">{{ formatPrice(order.total) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ShoppingBagIcon, ShoppingCartIcon } from '@heroicons/vue/24/outline'

const router = useRouter()
const loading = ref(true)
const orders = ref([])

// Mock data - replace with actual API call
const mockOrders = [
  {
    id: '1001',
    date: '2024-02-28',
    status: 'completed',
    items: [
      {
        id: 1,
        name: 'ProAnalytics Suite',
        quantity: 1,
        price: 49.99,
        image: 'https://www.vectorlogo.zone/logos/google_analytics/google_analytics-icon.svg'
      },
      {
        id: 2,
        name: 'CloudStack CRM',
        quantity: 1,
        price: 29.99,
        image: 'https://www.vectorlogo.zone/logos/salesforce/salesforce-icon.svg'
      }
    ],
    total: 79.98
  },
  {
    id: '1002',
    date: '2024-02-25',
    status: 'shipped',
    items: [
      {
        id: 3,
        name: 'SecureVault Pro',
        quantity: 2,
        price: 19.99,
        image: 'https://www.vectorlogo.zone/logos/lastpass/lastpass-icon.svg'
      }
    ],
    total: 39.98
  }
]

onMounted(async () => {
  try {
    // TODO: Replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    orders.value = mockOrders
  } catch (error) {
    console.error('Failed to fetch orders:', error)
  } finally {
    loading.value = false
  }
})

const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatStatus = (status) => {
  const statusMap = {
    completed: 'Terminée',
    processing: 'En cours',
    shipped: 'Expédiée'
  }
  return statusMap[status] || status
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