<template>
  <div class="min-h-screen bg-gradient-to-b from-cyan-50 to-white py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl animate-fade-in">
        <h1 class="text-3xl font-bold text-gray-900 mb-6">Conditions Générales d'Utilisation</h1>
        
        <div class="prose max-w-none">
          <h2 class="text-xl font-semibold text-gray-800 mt-6 mb-4">1. Introduction</h2>
          <p class="text-gray-600 mb-4">
            Les présentes Conditions Générales d'Utilisation (CGU) régissent votre utilisation de la plateforme H3,
            accessible depuis [votre-domaine]. En accédant à ce service, vous acceptez de vous conformer à ces conditions.
          </p>
          
          <h2 class="text-xl font-semibold text-gray-800 mt-6 mb-4">2. Description du Service</h2>
          <p class="text-gray-600 mb-4">
            H3 est une plateforme qui vous permet de gérer vos projets et vos tâches efficacement.
            Nous nous réservons le droit de modifier, suspendre ou interrompre tout aspect du service à tout moment.
          </p>
          
          <h2 class="text-xl font-semibold text-gray-800 mt-6 mb-4">3. Inscription et Compte</h2>
          <p class="text-gray-600 mb-4">
            Pour utiliser certaines fonctionnalités de notre service, vous devrez créer un compte. 
            Vous êtes responsable de maintenir la confidentialité de votre compte et mot de passe.
            Vous acceptez de nous informer immédiatement de toute utilisation non autorisée de votre compte.
          </p>
          
          <h2 class="text-xl font-semibold text-gray-800 mt-6 mb-4">4. Propriété Intellectuelle</h2>
          <p class="text-gray-600 mb-4">
            Tous les contenus présents sur H3, y compris les textes, graphiques, logos, icônes, images, 
            clips audio, téléchargements numériques et compilations de données, sont la propriété de H3 
            ou de ses fournisseurs de contenu et sont protégés par les lois françaises et internationales.
          </p>
          
          <h2 class="text-xl font-semibold text-gray-800 mt-6 mb-4">5. Limitation de Responsabilité</h2>
          <p class="text-gray-600 mb-4">
            H3 ne sera pas responsable des dommages directs, indirects, accessoires, spéciaux ou consécutifs 
            résultant de l'utilisation ou de l'impossibilité d'utiliser nos services.
          </p>
          
          <h2 class="text-xl font-semibold text-gray-800 mt-6 mb-4">6. Modifications des CGU</h2>
          <p class="text-gray-600 mb-4">
            Nous nous réservons le droit de modifier ces CGU à tout moment. Les modifications prendront effet 
            dès leur publication sur notre plateforme. Votre utilisation continue du service après de telles 
            modifications constitue votre acceptation des nouvelles conditions.
          </p>
          
          <h2 class="text-xl font-semibold text-gray-800 mt-6 mb-4">7. Contact</h2>
          <p class="text-gray-600 mb-4">
            Pour toute question concernant ces CGU, veuillez nous contacter à [votre-email-contact].
          </p>
          
          <p class="text-gray-500 mt-8 text-sm">
            Dernière mise à jour : {{ new Date().toLocaleDateString('fr-FR') }}
          </p>
        </div>
        
        <div class="mt-8">
          <router-link to="/" class="inline-block text-cyan-500 hover:text-cyan-600 font-medium">
            &larr; Retour à l'accueil
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No specific logic needed for this page
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
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