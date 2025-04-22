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
            Nos Produits
          </h1>
          <p class="text-xl text-gray-600 animate-fade-in animation-delay-200 max-w-2xl mx-auto">
            Découvrez notre sélection exclusive d'outils premium pour booster votre productivité
          </p>

          <!-- Search Section -->
          <div class="mt-12 max-w-2xl mx-auto animate-fade-in animation-delay-400">
            <div class="flex flex-col sm:flex-row gap-4">
              <div class="flex-1 relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  v-model="filters.search"
                  class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent shadow-sm transition duration-150 ease-in-out hover:border-gray-400"
                  placeholder="Rechercher un produit..."
                />
              </div>
              <div class="w-full sm:w-48">
                <select
                  v-model="filters.category"
                  class="block w-full py-3 pl-3 pr-10 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent shadow-sm transition duration-150 ease-in-out hover:border-gray-400"
                >
                  <option value="">Catégories</option>
                  <option v-for="category in categories" :key="category" :value="category">
                    {{ category }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>

    <!-- Rest of the content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Products Grid -->
      <div class="mt-12">
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="product in filteredProducts" :key="product.id" 
               class="group relative bg-white rounded-2xl shadow-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl animate-fade-in animation-delay-600">
            <div class="absolute top-0 right-0 mt-4 mr-4 z-10">
              <span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800">
                -{{ product.discount }}%
              </span>
            </div>
            <div class="p-8">
              <div class="flex justify-between items-start">
                <div class="h-12 w-12 rounded-xl bg-cyan-100 flex items-center justify-center">
                  <img :src="product.logo" :alt="product.name" class="h-8 w-8" />
                </div>
              </div>
              <div class="mt-6">
                <span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-cyan-100 text-cyan-800">
                  {{ product.category }}
                </span>
                <h3 class="mt-4 text-xl font-semibold text-gray-900">{{ product.name }}</h3>
                <p class="mt-2 text-sm text-gray-500">{{ product.description }}</p>
              </div>
              <div class="mt-6">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <span class="text-2xl font-bold text-gray-900">${{ product.price }}</span>
                    <span class="ml-2 text-sm text-gray-500 line-through">${{ product.originalPrice }}</span>
                  </div>
                  <span class="text-sm text-gray-500">{{ product.timeLeft }}</span>
                </div>
                <button
                  @click="viewProductDetails(product)"
                  class="mt-4 block w-full text-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transform transition"
                >
                  Voir l'Offre
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      </div>
    </div>


    <!-- Add/Edit Modal -->
    <div v-if="showAddModal || showEditModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div class="relative inline-block transform overflow-hidden rounded-2xl bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
          <div class="mt-3 text-center sm:mt-5">
            <form @submit.prevent="handleSubmit" class="space-y-4">
              <div>
                <input
                  type="text"
                  v-model="form.name"
                  required
                  class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
                  placeholder="Nom du produit"
                />
              </div>

              <div>
                <textarea
                  v-model="form.description"
                  required
                  rows="3"
                  class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
                  placeholder="Description"
                ></textarea>
              </div>

              <div>
                <select
                  v-model="form.category"
                  required
                  class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
                >
                  <option v-for="category in categories" :key="category" :value="category">
                    {{ category }}
                  </option>
                </select>
              </div>

              <div class="relative rounded-lg shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="text-gray-500 sm:text-sm">€</span>
                </div>
                <input
                  type="number"
                  v-model="form.price"
                  required
                  class="pl-7 block w-full rounded-lg border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <select
                  v-model="form.status"
                  required
                  class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
                >
                  <option value="active">Actif</option>
                  <option value="draft">Brouillon</option>
                  <option value="archived">Archivé</option>
                </select>
              </div>
            </form>
          </div>
          <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3">
            <button
              type="submit"
              @click="handleSubmit"
              class="inline-flex w-full justify-center rounded-lg border border-transparent px-4 py-2 text-base font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 sm:col-start-2 sm:text-sm"
            >
              {{ showEditModal ? 'Mettre à jour' : 'Ajouter' }}
            </button>
            <button
              type="button"
              @click="closeModal"
              class="mt-3 inline-flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:col-start-1 sm:mt-0 sm:text-sm"
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const categories = ['Analytics', 'CRM', 'Sécurité', 'Marketing', 'Productivité']

const products = ref([
  {
    id: 1,
    name: 'ProAnalytics Suite',
    description: 'Plateforme complète d\'analyse de données avec IA intégrée et tableaux de bord personnalisables.',
    category: 'Analytics',
    price: 49,
    originalPrice: 199,
    discount: 75,
    timeLeft: '2 jours',
    status: 'active',
    logo: 'https://www.vectorlogo.zone/logos/google_analytics/google_analytics-icon.svg'
  },
  {
    id: 2,
    name: 'CloudStack CRM',
    description: 'CRM intelligent avec automatisation des ventes et intégration email marketing.',
    category: 'CRM',
    price: 29,
    originalPrice: 99,
    discount: 70,
    timeLeft: '5 jours',
    status: 'active',
    logo: 'https://www.vectorlogo.zone/logos/salesforce/salesforce-icon.svg'
  },
  {
    id: 3,
    name: 'SecureVault Pro',
    description: 'Solution de gestion des mots de passe d\'entreprise avec authentification multi-facteurs.',
    category: 'Sécurité',
    price: 19,
    originalPrice: 79,
    discount: 76,
    timeLeft: '3 jours',
    status: 'active',
    logo: 'https://www.vectorlogo.zone/logos/lastpass/lastpass-icon.svg'
  }
])

const filters = ref({
  search: '',
  category: ''
})

const showAddModal = ref(false)
const showEditModal = ref(false)
const editingProduct = ref(null)

const form = ref({
  name: '',
  description: '',
  category: categories[0],
  price: 0,
  status: 'active'
})

const filteredProducts = computed(() => {
  return products.value
    .filter(product => product.status === 'active')
    .filter(product => {
      const matchesSearch = !filters.value.search || 
        product.name.toLowerCase().includes(filters.value.search.toLowerCase()) ||
        product.description.toLowerCase().includes(filters.value.search.toLowerCase())
      
      const matchesCategory = !filters.value.category || 
        product.category === filters.value.category

      return matchesSearch && matchesCategory
    })
})

function editProduct(product) {
  editingProduct.value = product
  form.value = { ...product }
  showEditModal.value = true
}

function deleteProduct(product) {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
    const index = products.value.findIndex(p => p.id === product.id)
    if (index !== -1) {
      products.value.splice(index, 1)
    }
  }
}

function handleSubmit() {
  if (showEditModal.value) {
    const index = products.value.findIndex(p => p.id === editingProduct.value.id)
    if (index !== -1) {
      products.value[index] = {
        ...editingProduct.value,
        ...form.value,
        updatedAt: new Date().toISOString().split('T')[0]
      }
    }
  } else {
    products.value.push({
      id: products.value.length + 1,
      ...form.value,
      logo: 'https://via.placeholder.com/40',
      updatedAt: new Date().toISOString().split('T')[0]
    })
  }
  closeModal()
}

function closeModal() {
  showAddModal.value = false
  showEditModal.value = false
  editingProduct.value = null
  form.value = {
    name: '',
    description: '',
    category: categories[0],
    price: 0,
    status: 'active'
  }
}

function viewProductDetails(product) {
  // Encoder le produit pour le passer dans l'URL
  const encodedProduct = encodeURIComponent(JSON.stringify(product))
  router.push({
    name: 'product-details',
    params: { product: encodedProduct }
  })
}

// Mettre à jour les filtres quand l'URL change
onMounted(() => {
  const categoryFromUrl = route.query.category
  if (categoryFromUrl) {
    filters.value.category = categoryFromUrl
  }
})

// Observer les changements de route pour mettre à jour les filtres
watch(
  () => route.query.category,
  (newCategory) => {
    filters.value.category = newCategory || ''
  }
)

// Observer les changements de filtres pour mettre à jour l'URL
watch(
  () => filters.value.category,
  (newCategory) => {
    if (newCategory !== route.query.category) {
      router.push({
        query: {
          ...route.query,
          category: newCategory || undefined
        }
      })
    }
  }
)
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

.animation-delay-600 {
  animation-delay: 0.6s;
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