<template>
  <div class="bg-white rounded-2xl shadow-xl p-8 animate-fade-in animation-delay-400">
    <div class="flex items-center mb-6">
      <div class="h-12 w-12 rounded-xl bg-cyan-100 flex items-center justify-center">
        <ShieldLockIcon class="h-6 w-6 text-cyan-600" />
      </div>
      <h2 class="text-2xl font-semibold ml-4 text-gray-900">Paramètres RGPD</h2>
    </div>

    <div class="space-y-6">
      <section>
        <h3 class="text-xl font-semibold text-gray-900 mb-4">Droits des Utilisateurs</h3>
        <p class="text-gray-600 mb-4">
          Conformément au Règlement Général de Protection des Données (RGPD), vous disposez de droits sur vos données personnelles.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <button 
            @click="exportData"
            class="flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-cyan-50 to-cyan-100 hover:from-cyan-100 hover:to-cyan-200 text-cyan-800 rounded-xl border border-cyan-200 transition duration-200"
            :disabled="isLoading"
          >
            <DownloadIcon class="h-5 w-5 mr-2" />
            <span>Exporter mes données</span>
          </button>
          
          <button 
            @click="confirmDelete = true"
            class="flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 text-red-800 rounded-xl border border-red-200 transition duration-200"
          >
            <TrashIcon class="h-5 w-5 mr-2" />
            <span>Supprimer mon compte</span>
          </button>
        </div>
      </section>

      <section class="pt-4 border-t border-gray-100">
        <h3 class="text-xl font-semibold text-gray-900 mb-4">Consentements</h3>
        
        <div v-for="(consent, index) in consentSettings" :key="index" class="mb-4 p-4 border border-gray-100 rounded-lg">
          <div class="flex items-start">
            <div class="flex h-6 items-center">
              <input 
                :id="`consent-${index}`" 
                type="checkbox"
                v-model="consent.value"
                @change="updateConsent(consent)"
                class="h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-600"
              />
            </div>
            <div class="ml-3 text-sm leading-6">
              <label :for="`consent-${index}`" class="font-medium text-gray-900">{{ consent.label }}</label>
              <p class="text-gray-500">{{ consent.description }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Delete Account Confirmation Modal -->
    <div v-if="confirmDelete" class="fixed inset-0 z-50 w-100 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-2xl p-8 max-w-lg w-full mx-4">
        <h3 class="text-2xl font-bold text-red-600 mb-4">Confirmation de suppression</h3>
        <p class="text-gray-600 mb-6">
          Êtes-vous sûr de vouloir supprimer définitivement votre compte et toutes vos données associées ? Cette action est irréversible.
        </p>
        <div class="flex flex-col sm:flex-row gap-4">
          <button 
            @click="confirmDelete = false"
            class="flex-1 py-3 px-6 rounded-xl border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
          >
            Annuler
          </button>
          <button 
            @click="deleteAccount"
            class="flex-1 py-3 px-6 rounded-xl bg-red-600 text-white hover:bg-red-700"
            :disabled="isDeleting"
          >
            {{ isDeleting ? 'Suppression...' : 'Confirmer la suppression' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { ArrowDownTrayIcon as DownloadIcon, ShieldCheckIcon as ShieldLockIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router'
import jsPDF from 'jspdf';

const API_URL = 'http://localhost:8000'

const auth = useAuthStore()
const router = useRouter()
const isLoading = ref(false)
const isDeleting = ref(false)
const confirmDelete = ref(false)

const consentSettings = ref([
  {
    id: 'marketing',
    label: 'Communications marketing',
    description: 'J\'accepte de recevoir des emails concernant les nouveaux produits et offres promotionnelles.',
    value: false
  },
  {
    id: 'analytics',
    label: 'Analyses et statistiques',
    description: 'J\'accepte que mes données de navigation soient utilisées pour améliorer le service.',
    value: false
  },
  {
    id: 'thirdparty',
    label: 'Partage avec des tiers',
    description: 'J\'accepte que mes données soient partagées avec des partenaires de confiance.',
    value: false
  }
])

onMounted(async () => {
  // Load user's consent settings from the backend
  try {
    if (!auth.token) {
      return
    }
    
    const response = await fetch(`${API_URL}/gdpr/consent`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${auth.token}`
      }
    })
    
    if (!response.ok) {
      throw new Error('Failed to load consent settings')
    }
    
    const userConsents = await response.json()
    
    // Update local consent settings based on database values
    consentSettings.value = consentSettings.value.map(consent => {
      const userConsent = userConsents.find(c => c.purpose === consent.id)
      return {
        ...consent,
        value: userConsent ? userConsent.granted : false
      }
    })
  } catch (error) {
    console.error('Failed to load consent settings:', error)
  }
})

const updateConsent = async (consent) => {
  try {
    if (!auth.token) {
      return
    }
    
    const response = await fetch(`${API_URL}/gdpr/consent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token}`
      },
      body: JSON.stringify({
        purpose: consent.id,
        granted: consent.value
      })
    })
    
    if (!response.ok) {
      throw new Error('Failed to update consent')
    }
    
    console.log(`Consent for ${consent.id} updated to ${consent.value}`)
  } catch (error) {
    console.error('Error updating consent:', error)
    // Reset the checkbox to its previous state
    consent.value = !consent.value
  }
}

const exportData = async () => {
  try {
    isLoading.value = true;

    if (!auth.token) {
      return;
    }

    const response = await fetch(`${API_URL}/gdpr/export`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${auth.token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to export data');
    }

    const data = await response.json();

    // --- PDF Generation Logic ---
    const doc = new jsPDF();
    const margin = 15;
    const lineHeight = 7; // Increased line height for better readability
    let yPosition = margin;

    const addText = (text, x, y, options = {}) => {
      const { fontSize = 12, fontStyle = 'normal' } = options;
      doc.setFontSize(fontSize);
      doc.setFont('helvetica', fontStyle); // Using a standard font

      // Split text if it exceeds page width
      const maxWidth = doc.internal.pageSize.width - margin * 2;
      const lines = doc.splitTextToSize(text, maxWidth);

      lines.forEach(line => {
        if (yPosition + lineHeight > doc.internal.pageSize.height - margin) {
          doc.addPage();
          yPosition = margin; // Reset y position for new page
        }
        doc.text(line, x, yPosition);
        yPosition += lineHeight;
      });
      return lines.length * lineHeight; // Return the height added
    };

    // ---- Title ----
    addText('Vos Données Personnelles', margin, yPosition, { fontSize: 18, fontStyle: 'bold' });
    yPosition += lineHeight; // Add extra space after title

    // ---- User Information ----
    if (data.user) {
      addText('Informations Utilisateur', margin, yPosition, { fontSize: 14, fontStyle: 'bold' });
      yPosition += lineHeight / 2; // Smaller space after section title

      const userDetails = [
        `ID: ${data.user.id}`,
        `Nom: ${data.user.name}`,
        `Email: ${data.user.email}`,
        `Créé le: ${new Date(data.user.created_at).toLocaleString('fr-FR')}`,
        `Mis à jour le: ${new Date(data.user.updated_at).toLocaleString('fr-FR')}`
      ];
      userDetails.forEach(detail => addText(detail, margin + 5, yPosition, { fontSize: 10 }));
      yPosition += lineHeight; // Add space after section
    }

    // ---- Login History ----
    if (data.login_history && data.login_history.length > 0) {
      addText('Historique de Connexion', margin, yPosition, { fontSize: 14, fontStyle: 'bold' });
       yPosition += lineHeight / 2;

      data.login_history.forEach((entry, index) => {
         if (yPosition + (lineHeight * 4) > doc.internal.pageSize.height - margin) { // Check space before adding entry
           doc.addPage();
           yPosition = margin;
           addText('Historique de Connexion (suite)', margin, yPosition, { fontSize: 14, fontStyle: 'bold' }); // Add title again on new page
           yPosition += lineHeight / 2;
         }
        addText(`Connexion #${index + 1}`, margin + 5, yPosition, { fontSize: 11, fontStyle: 'bold' });
        const loginDetails = [
          `Date: ${new Date(entry.login_timestamp).toLocaleString('fr-FR')}`,
          `Adresse IP: ${entry.ip_address}`,
          // Handle potentially long user agent string
        ];
        loginDetails.forEach(detail => addText(detail, margin + 10, yPosition, { fontSize: 10 }));
        // Add User Agent separately to handle wrapping
        addText(`Agent Utilisateur: ${entry.user_agent}`, margin + 10, yPosition, { fontSize: 10});
        yPosition += lineHeight / 2; // Space between entries
      });
      yPosition += lineHeight; // Add space after section
    } else {
         addText('Historique de Connexion', margin, yPosition, { fontSize: 14, fontStyle: 'bold' });
         yPosition += lineHeight / 2;
         addText('Aucun historique de connexion trouvé.', margin + 5, yPosition, { fontSize: 10 });
         yPosition += lineHeight;
    }


    // ---- Data Processing Consents ----
    // Check if data_processing_consents exists and has items before trying to access it
    if (data.data_processing_consents && data.data_processing_consents.length > 0) {
      addText('Consentements au Traitement des Données', margin, yPosition, { fontSize: 14, fontStyle: 'bold' });
      yPosition += lineHeight / 2;

      data.data_processing_consents.forEach((consent, index) => {
         if (yPosition + (lineHeight * 3) > doc.internal.pageSize.height - margin) { // Check space before adding entry
            doc.addPage();
            yPosition = margin;
            addText('Consentements (suite)', margin, yPosition, { fontSize: 14, fontStyle: 'bold' }); // Add title again on new page
            yPosition += lineHeight / 2;
         }
        const consentDetails = [
          `Objectif: ${consent.purpose}`,
          `Accordé: ${consent.granted ? 'Oui' : 'Non'}`, // Assuming 'granted' is boolean
          `Date: ${new Date(consent.timestamp).toLocaleString('fr-FR')}`, // Assuming 'timestamp'
        ];
        consentDetails.forEach(detail => addText(detail, margin + 5, yPosition, { fontSize: 10 }));
         yPosition += lineHeight / 2; // Space between entries
      });
    } else {
         // Handle case where consents are empty or don't exist
         addText('Consentements au Traitement des Données', margin, yPosition, { fontSize: 14, fontStyle: 'bold' });
         yPosition += lineHeight / 2;
         addText('Aucun consentement trouvé.', margin + 5, yPosition, { fontSize: 10 });
         yPosition += lineHeight;
    }

    // Trigger download
    const fileName = `vos-donnees-${new Date().toISOString().slice(0, 10)}.pdf`;
    doc.save(fileName);
    // --- End PDF Generation Logic ---

  } catch (error) {
    console.error('Error exporting data:', error);
  } finally {
    isLoading.value = false;
  }
};

const deleteAccount = async () => {
  try {
    isDeleting.value = true
    
    if (!auth.token) {
      return
    }
    
    const response = await fetch(`${API_URL}/gdpr/delete`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${auth.token}`
      }
    })
    
    if (!response.ok) {
      throw new Error('Failed to delete account')
    }
    
    // Log the user out and redirect to home page
    auth.logout()
    router.push('/')
    
  } catch (error) {
    console.error('Error deleting account:', error)
    confirmDelete.value = false
  } finally {
    isDeleting.value = false
  }
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

.animation-delay-400 {
  animation-delay: 0.4s;
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