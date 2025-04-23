<template>
  <div class="data-retention-settings bg-white p-6 rounded-lg shadow-sm">
    <h2 class="text-2xl font-bold mb-4">Conservation des Données</h2>
    <p class="text-gray-600 mb-6">
      Définissez la durée de conservation de vos données inactives et les paramètres d'archivage.
    </p>
    
    <div v-if="loading" class="text-center py-8">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      <p class="mt-2">Chargement des paramètres...</p>
    </div>
    
    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
      <p>{{ error }}</p>
    </div>
    
    <form v-else @submit.prevent="saveSettings" class="space-y-6">
      <div class="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
        <h3 class="font-medium text-lg mb-2">Paramètres actuels</h3>
        <ul class="list-disc pl-5 space-y-2 text-gray-600">
          <li>Les comptes inactifs sont archivés après <span class="font-medium">{{ settings.inactive_user_months }} mois</span> d'inactivité</li>
          <li>Les données archivées sont conservées pendant <span class="font-medium">{{ settings.archive_retention_years }} ans</span></li>
          <li>L'historique des consentements est conservé pendant <span class="font-medium">{{ settings.consent_history_years }} ans</span></li>
          <li>L'historique de connexion est conservé pendant <span class="font-medium">{{ settings.login_history_months }} mois</span></li>
        </ul>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="inactive_user_months" class="block text-sm font-medium text-gray-700 mb-1">
            Durée d'inactivité avant archivage (mois)
          </label>
          <input 
            type="number" 
            id="inactive_user_months" 
            v-model="form.inactive_user_months" 
            min="1"
            max="120"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <p class="mt-1 text-sm text-gray-500">
            Période après laquelle un compte inactif sera archivé
          </p>
        </div>
        
        <div>
          <label for="archive_retention_years" class="block text-sm font-medium text-gray-700 mb-1">
            Conservation des archives (années)
          </label>
          <input 
            type="number" 
            id="archive_retention_years" 
            v-model="form.archive_retention_years" 
            min="1"
            max="10"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <p class="mt-1 text-sm text-gray-500">
            Durée de conservation des données archivées
          </p>
        </div>
        
        <div>
          <label for="consent_history_years" class="block text-sm font-medium text-gray-700 mb-1">
            Conservation historique de consentement (années)
          </label>
          <input 
            type="number" 
            id="consent_history_years" 
            v-model="form.consent_history_years" 
            min="1"
            max="10"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <p class="mt-1 text-sm text-gray-500">
            Durée de conservation de l'historique des consentements
          </p>
        </div>
        
        <div>
          <label for="login_history_months" class="block text-sm font-medium text-gray-700 mb-1">
            Conservation historique de connexion (mois)
          </label>
          <input 
            type="number" 
            id="login_history_months" 
            v-model="form.login_history_months" 
            min="1"
            max="36"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <p class="mt-1 text-sm text-gray-500">
            Durée de conservation de l'historique des connexions
          </p>
        </div>
      </div>
      
      <div class="flex justify-between items-center pt-4 border-t border-gray-200 mt-8">
        <button 
          type="button"
          @click="runRetentionTasks"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          :disabled="runningTasks || saving"
        >
          <span v-if="runningTasks">Traitement en cours...</span>
          <span v-else>Exécuter le nettoyage maintenant</span>
        </button>
        
        <div class="flex space-x-3">
          <button 
            type="button"
            @click="resetForm"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            :disabled="saving"
          >
            Réinitialiser
          </button>
          
          <button 
            type="submit"
            class="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark transition-colors"
            :disabled="saving || !formChanged"
          >
            <span v-if="saving">Enregistrement...</span>
            <span v-else>Enregistrer les modifications</span>
          </button>
        </div>
      </div>
    </form>
    
    <div v-if="successMessage" class="mt-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
      <p>{{ successMessage }}</p>
    </div>
  </div>
</template>

<script>
import { ref, computed, reactive, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '../stores/auth';

export default {
  name: 'DataRetentionSettings',
  
  setup() {
    const authStore = useAuthStore();
    const loading = ref(true);
    const saving = ref(false);
    const runningTasks = ref(false);
    const error = ref(null);
    const successMessage = ref(null);
    
    // Default settings
    const settings = reactive({
      inactive_user_months: 36,
      archive_retention_years: 5,
      consent_history_years: 3,
      login_history_months: 12
    });
    
    // Form data
    const form = reactive({
      inactive_user_months: 36,
      archive_retention_years: 5,
      consent_history_years: 3,
      login_history_months: 12
    });
    
    // Check if form has changed
    const formChanged = computed(() => {
      return form.inactive_user_months !== settings.inactive_user_months ||
             form.archive_retention_years !== settings.archive_retention_years ||
             form.consent_history_years !== settings.consent_history_years ||
             form.login_history_months !== settings.login_history_months;
    });
    
    // Fetch current settings
    const fetchSettings = async () => {
      loading.value = true;
      error.value = null;
      
      try {
        const response = await axios.get('/api/gdpr/retention/config', {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        });
        
        // Update settings
        Object.assign(settings, response.data);
        resetForm();
      } catch (err) {
        console.error('Failed to fetch data retention settings:', err);
        error.value = 'Impossible de récupérer les paramètres de conservation des données.';
      } finally {
        loading.value = false;
      }
    };
    
    // Reset form to current settings
    const resetForm = () => {
      form.inactive_user_months = settings.inactive_user_months;
      form.archive_retention_years = settings.archive_retention_years;
      form.consent_history_years = settings.consent_history_years;
      form.login_history_months = settings.login_history_months;
    };
    
    // Save settings
    const saveSettings = async () => {
      saving.value = true;
      error.value = null;
      successMessage.value = null;
      
      try {
        await axios.post('/api/gdpr/retention', form, {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        });
        
        // Update settings with form values
        Object.assign(settings, form);
        successMessage.value = 'Paramètres de conservation mis à jour avec succès.';
        
        // Clear success message after a delay
        setTimeout(() => {
          successMessage.value = null;
        }, 5000);
      } catch (err) {
        console.error('Failed to save data retention settings:', err);
        error.value = 'Impossible d\'enregistrer les paramètres de conservation des données.';
      } finally {
        saving.value = false;
      }
    };
    
    // Run data retention tasks
    const runRetentionTasks = async () => {
      if (!confirm('Cette opération va archiver les comptes inactifs et nettoyer les anciennes données. Continuer ?')) {
        return;
      }
      
      runningTasks.value = true;
      error.value = null;
      successMessage.value = null;
      
      try {
        await axios.post('/api/gdpr/retention', {}, {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        });
        
        successMessage.value = 'Les tâches de conservation des données ont été exécutées avec succès.';
        
        // Clear success message after a delay
        setTimeout(() => {
          successMessage.value = null;
        }, 5000);
      } catch (err) {
        console.error('Failed to run data retention tasks:', err);
        error.value = 'Impossible d\'exécuter les tâches de conservation des données.';
      } finally {
        runningTasks.value = false;
      }
    };
    
    onMounted(fetchSettings);
    
    return {
      settings,
      form,
      loading,
      saving,
      runningTasks,
      error,
      successMessage,
      formChanged,
      saveSettings,
      resetForm,
      runRetentionTasks
    };
  }
};
</script> 