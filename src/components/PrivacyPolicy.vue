<template>
  <div class="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold text-gray-900 mb-6">Politique de Confidentialité</h1>
    
    <div class="space-y-8 text-gray-700">
      <section>
        <h2 class="text-xl font-semibold text-gray-900 mb-3">Introduction</h2>
        <p class="mb-3">
          La présente politique de confidentialité a pour but de vous informer sur la manière dont nous recueillons, utilisons et protégeons vos données personnelles, conformément au Règlement Général sur la Protection des Données (RGPD).
        </p>
        <p>
          Cette application est conçue avec une approche "Privacy by Design", ce qui signifie que la protection de vos données a été prise en compte dès sa conception.
        </p>
      </section>
      
      <section>
        <h2 class="text-xl font-semibold text-gray-900 mb-3">Données collectées</h2>
        <p class="mb-3">Nous collectons uniquement les données strictement nécessaires au fonctionnement de notre service :</p>
        <ul class="list-disc pl-6 space-y-2">
          <li><strong>Données d'identification</strong> : nom, adresse email</li>
          <li><strong>Données de connexion</strong> : adresse IP, agent utilisateur, horodatage</li>
          <li><strong>Préférences</strong> : consentements donnés pour différentes utilisations de vos données</li>
        </ul>
      </section>
      
      <section>
        <h2 class="text-xl font-semibold text-gray-900 mb-3">Utilisation des données</h2>
        <p class="mb-3">Vos données sont utilisées pour :</p>
        <ul class="list-disc pl-6 space-y-2">
          <li>Créer et gérer votre compte utilisateur</li>
          <li>Assurer la sécurité de votre compte (détection de connexions suspectes)</li>
          <li>Vous fournir les services que vous avez demandés</li>
          <li>Vous contacter en cas de besoin concernant votre compte ou nos services</li>
          <li>Si vous y avez consenti, vous envoyer des communications marketing</li>
        </ul>
      </section>
      
      <section>
        <h2 class="text-xl font-semibold text-gray-900 mb-3">Durée de conservation</h2>
        <p>
          Nous conservons vos données aussi longtemps que votre compte est actif. Les données de connexion sont conservées pendant 6 mois pour des raisons de sécurité. Vous pouvez à tout moment demander la suppression de votre compte et de toutes les données associées.
        </p>
      </section>
      
      <section>
        <h2 class="text-xl font-semibold text-gray-900 mb-3">Protection des données</h2>
        <p>
          Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour assurer la sécurité de vos données, notamment :
        </p>
        <ul class="list-disc pl-6 space-y-2">
          <li>Chiffrement des communications (SSL/TLS)</li>
          <li>Stockage sécurisé des mots de passe (hachage bcrypt)</li>
          <li>Contrôles d'accès stricts pour nos équipes</li>
          <li>Surveillance des accès aux données personnelles</li>
        </ul>
      </section>
      
      <section>
        <h2 class="text-xl font-semibold text-gray-900 mb-3">Vos droits</h2>
        <p class="mb-3">Conformément au RGPD, vous disposez des droits suivants :</p>
        <ul class="list-disc pl-6 space-y-2">
          <li><strong>Droit d'accès</strong> : vous pouvez exporter toutes vos données depuis votre compte</li>
          <li><strong>Droit de rectification</strong> : vous pouvez modifier vos informations personnelles à tout moment</li>
          <li><strong>Droit à l'effacement</strong> : vous pouvez supprimer votre compte et toutes vos données</li>
          <li><strong>Droit de limitation</strong> : vous pouvez restreindre l'utilisation de vos données via vos préférences de consentement</li>
          <li><strong>Droit d'opposition</strong> : vous pouvez vous opposer au traitement de vos données pour certaines finalités</li>
          <li><strong>Droit à la portabilité</strong> : vous pouvez télécharger vos données dans un format réutilisable</li>
        </ul>
      </section>
      
      <section>
        <h2 class="text-xl font-semibold text-gray-900 mb-3">Violations de données</h2>
        <p>
          En cas de violation de données susceptible d'engendrer un risque pour vos droits et libertés, nous nous engageons à vous en informer dans les meilleurs délais, ainsi que les autorités de contrôle compétentes, conformément aux exigences du RGPD.
        </p>
      </section>
      
      <section>
        <h2 class="text-xl font-semibold text-gray-900 mb-3">Contact</h2>
        <p>
          Pour toute question concernant cette politique de confidentialité ou l'exercice de vos droits, veuillez nous contacter à l'adresse : <a href="mailto:privacy@example.com" class="text-cyan-600 hover:underline">privacy@example.com</a>
        </p>
      </section>
      
      <section class="pt-4 border-t border-gray-200">
        <p class="text-sm text-gray-500">
          Dernière mise à jour : {{ formattedDate }}
        </p>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const lastUpdated = new Date()
const formattedDate = ref(lastUpdated.toLocaleDateString('fr-FR'))
</script> 