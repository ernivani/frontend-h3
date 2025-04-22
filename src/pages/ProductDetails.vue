<template>
  <div class="bg-white">
    <div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <div v-if="product" class="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
        <!-- Image -->
        <div class="flex flex-col">
          <div class="w-full aspect-w-1 aspect-h-1 bg-gray-50 rounded-lg overflow-hidden">
            <img :src="product.logo" :alt="product.name" class="w-full h-full object-center object-contain" />
          </div>
        </div>

        <!-- Product info -->
        <div class="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <div class="flex items-center">
            <h1 class="text-3xl font-extrabold tracking-tight text-gray-900">{{ product.name }}</h1>
            <span class="ml-4 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800">
              -{{ product.discount }}%
            </span>
          </div>

          <!-- Category -->
          <div class="mt-3">
            <span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
              {{ product.category }}
            </span>
          </div>

          <!-- Price -->
          <div class="mt-6">
            <div class="flex items-center">
              <p class="text-4xl font-bold text-gray-900">${{ product.price }}</p>
              <p class="ml-3 text-lg line-through text-gray-500">${{ product.originalPrice }}</p>
            </div>
            <p class="mt-2 text-sm text-red-600">{{ product.timeLeft }} restants</p>
          </div>

          <!-- Description -->
          <div class="mt-6">
            <h2 class="text-lg font-medium text-gray-900">Description</h2>
            <div class="mt-4 prose prose-sm text-gray-500">
              <p>{{ product.description }}</p>
            </div>
          </div>

          <!-- Features -->
          <div class="mt-8">
            <h2 class="text-lg font-medium text-gray-900">Caractéristiques principales</h2>
            <div class="mt-4">
              <ul class="space-y-2">
                <li class="flex items-center">
                  <svg class="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="ml-2 text-gray-600">Accès immédiat après paiement</span>
                </li>
                <li class="flex items-center">
                  <svg class="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="ml-2 text-gray-600">Support technique prioritaire</span>
                </li>
                <li class="flex items-center">
                  <svg class="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="ml-2 text-gray-600">Mises à jour gratuites</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Checkout button -->
          <div class="mt-10 flex flex-col space-y-4">
            <button
              @click="proceedToCheckout"
              class="w-full bg-primary border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Acheter maintenant
            </button>
            <p class="text-center text-sm text-gray-500">
              Paiement sécurisé via Stripe
            </p>
          </div>
        </div>
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

onMounted(() => {
  const productData = route.params.product
  if (!productData) {
    router.push('/products')
    return
  }
  product.value = JSON.parse(decodeURIComponent(productData))
})

const proceedToCheckout = () => {
  router.push({
    name: 'checkout',
    params: { product: route.params.product }
  })
}
</script> 