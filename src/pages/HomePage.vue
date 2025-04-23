<template>
  <MainLayout>
    <div class="bg-white rounded-lg shadow-md p-6">
      <h1 class="text-3xl font-bold mb-4">Bienvenue sur H3</h1>
      <div class="prose max-w-none">
        <p class="text-gray-600">
          Cette plateforme vous permet de gérer vos projets et vos tâches efficacement.
        </p>
        <template v-if="!auth.isAuthenticated">
          <div class="mt-6">
            <p class="text-gray-600 mb-4">
              Pour commencer, veuillez vous connecter ou créer un compte.
            </p>
            <div class="flex gap-4">
              <router-link
                to="/login"
                class="inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600"
              >
                Se connecter
              </router-link>
              <router-link
                to="/register"
                class="inline-block bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600"
              >
                S'inscrire
              </router-link>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="mt-6">
            <h2 class="text-xl font-bold mb-4">Tableau de bord</h2>
            <!-- Ici, vous pouvez ajouter le contenu pour les utilisateurs connectés -->
          </div>
        </template>
      </div>
    </div>
    
    <!-- Footer with links -->
    <footer class="mt-8 py-4 border-t border-gray-100">
      <div class="flex flex-wrap justify-center gap-x-6 text-sm text-gray-500">
        <router-link to="/terms-of-service" class="hover:text-cyan-600 transition-colors">
          Conditions Générales d'Utilisation
        </router-link>
        <router-link to="/mentions-legales" class="hover:text-cyan-600 transition-colors">
          Mentions Légales
        </router-link>
        <router-link to="/privacy-policy" class="hover:text-cyan-600 transition-colors">
          Politique de Confidentialité
        </router-link>
      </div>
    </footer>
  </MainLayout>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
import MainLayout from '../layouts/MainLayout.vue'

const auth = useAuthStore()
</script> 