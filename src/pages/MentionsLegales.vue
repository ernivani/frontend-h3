<template>
  <div class="min-h-screen bg-gradient-to-b from-cyan-50 to-white py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl animate-fade-in">
        <h1 class="text-3xl font-bold text-gray-900 mb-6">Mentions Légales</h1>
        
        <div class="prose max-w-none">
          <h2 class="text-xl font-semibold text-gray-800 mt-6 mb-4">1. Éditeur du Site</h2>
          <p class="text-gray-600 mb-4">
            Le site H3 est édité par [Nom de votre société], société [forme juridique] au capital de [montant] euros,
            immatriculée au Registre du Commerce et des Sociétés de [ville] sous le numéro [numéro SIRET].
          </p>
          <p class="text-gray-600 mb-4">
            Siège social : [adresse complète]<br>
            Directeur de la publication : [nom du directeur]<br>
            Contact : [email]
          </p>
          
          <h2 class="text-xl font-semibold text-gray-800 mt-6 mb-4">2. Hébergement</h2>
          <p class="text-gray-600 mb-4">
            Ce site est hébergé par [nom de l'hébergeur], [forme juridique],
            dont le siège social est situé [adresse complète].
          </p>
          
          <h2 class="text-xl font-semibold text-gray-800 mt-6 mb-4">3. Propriété Intellectuelle</h2>
          <p class="text-gray-600 mb-4">
            L'ensemble des éléments constituant le site H3 (textes, graphismes, logiciels, photographies, images, vidéos, sons, plans, logos, marques, etc.)
            ainsi que la structure générale du site sont la propriété exclusive de [Nom de votre société] ou de ses partenaires.
          </p>
          <p class="text-gray-600 mb-4">
            Toute représentation et/ou reproduction et/ou exploitation partielle ou totale des contenus et services proposés par le site H3,
            par quelque procédé que ce soit, sans l'autorisation préalable et écrite de [Nom de votre société], est strictement interdite
            et serait susceptible de constituer une contrefaçon au sens des articles L 335-2 et suivants du Code de la propriété intellectuelle.
          </p>
          
          <h2 class="text-xl font-semibold text-gray-800 mt-6 mb-4">4. Données Personnelles</h2>
          <p class="text-gray-600 mb-4">
            Les informations recueillies sur ce site font l'objet d'un traitement informatique destiné à [finalité du traitement].
            Conformément à la loi « informatique et libertés » du 6 janvier 1978 modifiée et au Règlement européen n°2016/679/UE du 27 avril 2016,
            vous bénéficiez d'un droit d'accès, de rectification, de portabilité et d'effacement de vos données ou encore de limitation du traitement.
          </p>
          <p class="text-gray-600 mb-4">
            Pour exercer ces droits ou pour toute question sur le traitement de vos données, vous pouvez nous contacter à [email de contact RGPD].
          </p>
          
          <h2 class="text-xl font-semibold text-gray-800 mt-6 mb-4">5. Cookies</h2>
          <p class="text-gray-600 mb-4">
            Le site H3 peut être amené à vous demander l'acceptation des cookies pour des besoins de statistiques et d'affichage.
            Un cookie est une information déposée sur votre disque dur par le serveur du site que vous visitez.
            Pour en savoir plus sur les cookies et comment les gérer, veuillez consulter notre <router-link to="/privacy-policy" class="text-cyan-500 hover:text-cyan-600">politique de confidentialité</router-link>.
          </p>
          
          <h2 class="text-xl font-semibold text-gray-800 mt-6 mb-4">6. Liens Hypertextes</h2>
          <p class="text-gray-600 mb-4">
            Le site H3 peut contenir des liens hypertextes vers d'autres sites internet ou applications.
            [Nom de votre société] n'exerce aucun contrôle sur ces sites et applications et décline toute responsabilité
            quant à leur contenu, leur légalité ou leur disponibilité.
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