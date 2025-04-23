<template>
  <div class="min-h-screen bg-gradient-to-b from-cyan-50 to-white">
    <!-- Hero Section avec animation -->
    <div class="relative overflow-hidden">
      <!-- Cercles décoratifs animés -->
      <div class="absolute top-0 left-0 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div class="absolute top-0 right-0 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div class="absolute -bottom-8 left-20 w-96 h-96 bg-cyan-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div class="relative max-w-7xl mx-auto pt-32 pb-40 px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-4xl mx-auto">
          <h1 class="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 mb-8 animate-fade-in">
            Cyna
          </h1>
          <p class="text-2xl md:text-4xl font-bold text-gray-900 mb-6 animate-fade-in animation-delay-200">
            Les Meilleurs Outils SaaS
          </p>
          <p class="mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl max-w-3xl mx-auto animate-fade-in animation-delay-400">
            Découvrez notre sélection d'outils premium avec jusqu'à 70% de réduction.
            Boostez votre productivité dès aujourd'hui.
          </p>
          <div class="mt-12 flex justify-center space-x-6 animate-fade-in animation-delay-600">
            <a
              href="#featured-deals"
              class="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 md:py-4 md:text-lg md:px-10 transform transition hover:scale-105"
              @click.prevent="navigateToProducts()"
            >
              Voir les offres
            </a>
            <a
              href="#categories"
              class="inline-flex items-center px-8 py-3 border-2 border-cyan-500 text-base font-medium rounded-full text-cyan-600 bg-white hover:bg-cyan-50 md:py-4 md:text-lg md:px-10 transform transition hover:scale-105"
              @click.prevent="navigateToProducts()"
            >
              Explorer
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Featured Deals Section -->
    <div id="featured-deals" class="py-24 lg:py-32">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto">
          <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
            Offres Vedettes
          </h2>
          <p class="mt-6 text-xl text-gray-500">
            Ne manquez pas nos meilleures offres du moment
          </p>
        </div>

        <div class="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          <div v-for="deal in featuredDeals" :key="deal.id" class="bg-white rounded-2xl shadow-xl overflow-hidden transform transition hover:scale-105 hover:shadow-2xl">
            <div class="p-8 lg:p-10">
              <div class="flex justify-between items-start">
                <div class="h-12 w-12 rounded-xl bg-cyan-100 flex items-center justify-center">
                  <img :src="deal.logo" :alt="deal.name" class="h-8 w-8" />
                </div>
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                  -{{ deal.discount }}%
                </span>
              </div>
              <div class="mt-6">
                <div class="text-xs font-medium text-cyan-600 uppercase tracking-wider">
                  {{ deal.category }}
                </div>
                <h3 class="mt-2 text-xl font-semibold text-gray-900">{{ deal.name }}</h3>
                <p class="mt-3 text-base text-gray-500">{{ deal.description }}</p>
              </div>
              <div class="mt-6">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <span class="text-2xl font-bold text-gray-900">${{ deal.price }}</span>
                    <span class="ml-2 text-sm text-gray-500 line-through">${{ deal.originalPrice }}</span>
                  </div>
                  <span class="text-sm text-gray-500">{{ deal.timeLeft }}</span>
                </div>
                <a
                  :href="deal.href"
                  class="mt-4 block w-full text-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                  @click.prevent="viewProductDetails(deal)"
                >
                  Voir l'offre
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Categories Section -->
    <div id="categories" class="py-24 lg:py-32 bg-gradient-to-b from-white to-cyan-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto">
          <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
            Catégories
          </h2>
          <p class="mt-6 text-xl text-gray-500">
            Explorez notre catalogue par catégorie
          </p>
        </div>

        <div class="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div v-for="category in categories" :key="category.name" 
               class="group relative bg-white rounded-2xl shadow-md p-8 lg:p-10 transform transition duration-300 hover:scale-105 hover:shadow-xl"
               @click="navigateToProducts(category.name)"
               style="cursor: pointer">
            <div class="h-12 w-12 rounded-xl bg-cyan-100 flex items-center justify-center mb-4">
              <component :is="category.icon" class="h-6 w-6 text-cyan-600" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900">{{ category.name }}</h3>
            <p class="mt-2 text-sm text-gray-500">{{ category.description }}</p>
            <p class="mt-4 text-sm font-medium text-cyan-600">
              {{ category.count }} produits
            </p>
            <a :href="category.href" class="absolute inset-0" aria-hidden="true"></a>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Footer with Legal Links -->
    <footer class="py-12 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col items-center">
          <div class="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-gray-500">
            <router-link to="/terms-of-service" class="hover:text-cyan-600 transition-colors font-medium">
              Conditions Générales d'Utilisation
            </router-link>
            <router-link to="/mentions-legales" class="hover:text-cyan-600 transition-colors font-medium">
              Mentions Légales
            </router-link>
            <router-link to="/privacy-policy" class="hover:text-cyan-600 transition-colors font-medium">
              Politique de Confidentialité
            </router-link>
          </div>
          <p class="mt-6 text-sm text-gray-400">
            © {{ new Date().getFullYear() }} Cyna. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { MegaphoneIcon, ClockIcon, CodeBracketIcon, PaintBrushIcon } from '@heroicons/vue/24/outline'

const router = useRouter()

const featuredDeals = [
  {
    id: 1,
    name: 'ProAnalytics Suite',
    category: 'Analytics',
    description: 'Plateforme complète d\'analyse de données avec IA intégrée et tableaux de bord personnalisables.',
    logo: 'https://www.vectorlogo.zone/logos/google_analytics/google_analytics-icon.svg',
    price: 49,
    originalPrice: 199,
    discount: 75,
    timeLeft: '2 jours restants',
    status: 'active'
  },
  {
    id: 2,
    name: 'CloudStack CRM',
    category: 'CRM',
    description: 'CRM intelligent avec automatisation des ventes et intégration email marketing.',
    logo: 'https://www.vectorlogo.zone/logos/salesforce/salesforce-icon.svg',
    price: 29,
    originalPrice: 99,
    discount: 70,
    timeLeft: '5 jours restants',
    status: 'active'
  },
  {
    id: 3,
    name: 'SecureVault Pro',
    category: 'Sécurité',
    description: 'Solution de gestion des mots de passe d\'entreprise avec authentification multi-facteurs.',
    logo: 'https://www.vectorlogo.zone/logos/lastpass/lastpass-icon.svg',
    price: 19,
    originalPrice: 79,
    discount: 76,
    timeLeft: '3 jours restants',
    status: 'active'
  },
]

const categories = [
  {
    name: 'Marketing',
    description: 'Outils d\'automatisation et analytics',
    count: 45,
    icon: MegaphoneIcon,
  },
  {
    name: 'Productivité',
    description: 'Gestion de projet et collaboration',
    count: 32,
    icon: ClockIcon,
  },
  {
    name: 'Développement',
    description: 'Outils de développement et CI/CD',
    count: 28,
    icon: CodeBracketIcon,
  },
  {
    name: 'Design',
    description: 'UI/UX et outils de design',
    count: 24,
    icon: PaintBrushIcon,
  },
]

function viewProductDetails(product) {
  const encodedProduct = encodeURIComponent(JSON.stringify(product))
  router.push({
    name: 'product-details',
    params: { product: encodedProduct }
  })
}

function navigateToProducts(category = '') {
  router.push({
    name: 'products',
    query: category ? { category } : undefined
  })
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