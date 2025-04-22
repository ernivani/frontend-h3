<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <!-- En-tête -->
      <div class="max-w-3xl mx-auto">
        <div class="space-y-2 text-center mb-8">
          <h1 class="text-3xl font-extrabold text-gray-900">Checkout</h1>
          <p class="text-gray-500">Finalisez votre commande</p>
        </div>

        <!-- Résumé du produit -->
        <div class="bg-white shadow rounded-lg mb-8">
          <div class="p-6">
            <div class="flex items-center">
              <img :src="product?.logo" :alt="product?.name" class="h-16 w-16 object-contain bg-gray-50 rounded-lg" />
              <div class="ml-6">
                <h2 class="text-xl font-medium text-gray-900">{{ product?.name }}</h2>
                <div class="mt-1 flex items-center">
                  <span class="text-2xl font-bold text-gray-900">${{ product?.price }}</span>
                  <span class="ml-2 text-sm text-gray-500 line-through">${{ product?.originalPrice }}</span>
                  <span class="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    -{{ product?.discount }}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Formulaire de paiement -->
        <form @submit.prevent="handleSubmit" class="bg-white shadow rounded-lg">
          <div class="p-6 space-y-6">
            <!-- Informations personnelles -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 mb-4">Informations personnelles</h3>
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label for="firstName" class="block text-sm font-medium text-gray-700">Prénom</label>
                  <input
                    type="text"
                    id="firstName"
                    v-model="form.firstName"
                    required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                </div>
                <div>
                  <label for="lastName" class="block text-sm font-medium text-gray-700">Nom</label>
                  <input
                    type="text"
                    id="lastName"
                    v-model="form.lastName"
                    required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                </div>
                <div class="sm:col-span-2">
                  <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    v-model="form.email"
                    required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <!-- Informations de paiement -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 mb-4">Informations de paiement</h3>
              <div class="space-y-4">
                <div>
                  <label for="cardNumber" class="block text-sm font-medium text-gray-700">Numéro de carte</label>
                  <input
                    type="text"
                    id="cardNumber"
                    v-model="form.cardNumber"
                    required
                    placeholder="4242 4242 4242 4242"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label for="expiry" class="block text-sm font-medium text-gray-700">Date d'expiration</label>
                    <input
                      type="text"
                      id="expiry"
                      v-model="form.expiry"
                      required
                      placeholder="MM/YY"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    />
                  </div>
                  <div>
                    <label for="cvc" class="block text-sm font-medium text-gray-700">CVC</label>
                    <input
                      type="text"
                      id="cvc"
                      v-model="form.cvc"
                      required
                      placeholder="123"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer avec total et bouton de paiement -->
          <div class="px-6 py-4 bg-gray-50 rounded-b-lg">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-700">Total à payer:</p>
                <p class="text-2xl font-bold text-gray-900">${{ product?.price }}</p>
              </div>
              <button
                type="submit"
                class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Payer maintenant
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const product = ref(null)
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  cardNumber: '',
  expiry: '',
  cvc: ''
})

onMounted(() => {
  // Récupérer le produit depuis les paramètres de route
  const productData = route.params.product
  if (!productData) {
    router.push('/products')
    return
  }
  product.value = JSON.parse(decodeURIComponent(productData))
})

const handleSubmit = () => {
  // Ici, vous implémenteriez la logique de paiement réelle
  alert('Paiement effectué avec succès!')
  router.push('/products')
}
</script> 