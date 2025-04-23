<template>
  <div class="consent-history">
    <h2 class="text-2xl font-bold mb-4">Historique des Consentements</h2>
    
    <div v-if="loading" class="text-center py-8">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      <p class="mt-2">Chargement de l'historique...</p>
    </div>
    
    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
      <p>{{ error }}</p>
    </div>
    
    <div v-else-if="history.length === 0" class="text-center py-8 bg-gray-50 rounded-lg">
      <p class="text-gray-500">Aucun historique de consentement disponible.</p>
    </div>
    
    <div v-else class="overflow-x-auto mt-4">
      <table class="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Finalité</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Consentement</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appareil</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="record in history" :key="record.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ formatDate(record.timestamp) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ formatPurpose(record.purpose) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
              <span 
                :class="record.granted 
                  ? 'bg-green-100 text-green-800 border-green-300' 
                  : 'bg-red-100 text-red-800 border-red-300'"
                class="px-2 py-1 rounded-full text-xs border"
              >
                {{ record.granted ? 'Accordé' : 'Retiré' }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ formatUserAgent(record.user_agent) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div class="mt-6 flex justify-end">
      <button 
        @click="downloadHistory" 
        class="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors"
        :disabled="loading || history.length === 0"
      >
        Télécharger l'historique
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '../stores/auth';

export default {
  name: 'ConsentHistory',
  
  setup() {
    const history = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const authStore = useAuthStore();
    
    const fetchConsentHistory = async () => {
      loading.value = true;
      error.value = null;
      
      try {
        const response = await axios.get('http://localhost:8000/gdpr/consent/history', {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        });
        
        history.value = response.data;
      } catch (err) {
        console.error('Failed to fetch consent history:', err);
        error.value = 'Impossible de récupérer l\'historique des consentements. Veuillez réessayer plus tard.';
      } finally {
        loading.value = false;
      }
    };
    
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    };
    
    const formatPurpose = (purpose) => {
      const purposeMap = {
        'essential': 'Données essentielles au service',
        'analytics': 'Amélioration du service',
        'marketing': 'Communications marketing',
        'personalization': 'Personnalisation'
      };
      
      return purposeMap[purpose] || purpose;
    };
    
    const formatUserAgent = (userAgent) => {
      if (!userAgent) return 'Inconnu';
      
      // Simplify user agent for display
      if (userAgent.includes('Mobile')) return 'Mobile';
      if (userAgent.includes('Android')) return 'Android';
      if (userAgent.includes('iPhone') || userAgent.includes('iPad')) return 'iOS';
      if (userAgent.includes('Windows')) return 'Windows';
      if (userAgent.includes('Mac')) return 'Mac';
      if (userAgent.includes('Linux')) return 'Linux';
      
      return 'Navigateur Web';
    };
    
    const downloadHistory = () => {
      if (history.value.length === 0) return;
      
      // Create CSV content
      const headers = ['Date', 'Finalité', 'Consentement', 'Adresse IP', 'Appareil'];
      const csvRows = [headers];
      
      history.value.forEach(record => {
        csvRows.push([
          formatDate(record.timestamp),
          formatPurpose(record.purpose),
          record.granted ? 'Accordé' : 'Retiré',
          record.ip_address || 'Non disponible',
          record.user_agent ? formatUserAgent(record.user_agent) : 'Non disponible'
        ]);
      });
      
      // Convert to CSV
      const csvContent = csvRows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
      
      // Create download link
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `historique_consentements_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    
    onMounted(fetchConsentHistory);
    
    return {
      history,
      loading,
      error,
      formatDate,
      formatPurpose,
      formatUserAgent,
      downloadHistory
    };
  }
};
</script> 