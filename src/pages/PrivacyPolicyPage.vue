<template>
  <div class="min-h-screen bg-gradient-to-b from-cyan-50 to-white py-20">
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 mb-4">
          Politique de Confidentialité
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Comment nous protégeons vos données personnelles
        </p>
      </div>
      
      <PrivacyPolicy />
    </div>
  </div>
</template>

<script setup>
import PrivacyPolicy from '@/components/PrivacyPolicy.vue'
</script> 