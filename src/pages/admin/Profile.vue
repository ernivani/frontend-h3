<template>
  <div>
    <div class="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
      <form @submit.prevent="handleSubmit">
        <div class="shadow sm:overflow-hidden sm:rounded-md">
          <div class="space-y-6 bg-white py-6 px-4 sm:p-6">
            <div>
              <h3 class="text-lg font-medium leading-6 text-gray-900">Profil</h3>
              <p class="mt-1 text-sm text-gray-500">
                Ces informations seront affichées publiquement, alors faites attention à ce que vous partagez.
              </p>
            </div>

            <div class="col-span-3">
              <label class="block text-sm font-medium text-gray-700">Photo</label>
              <div class="mt-1 flex items-center">
                <span class="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                  <img
                    :src="form.avatar || 'https://ui-avatars.com/api/?name=' + form.name"
                    :alt="form.name"
                    class="h-full w-full rounded-full"
                  />
                </span>
                <button
                  type="button"
                  class="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Changer
                </button>
              </div>
            </div>

            <div class="grid grid-cols-6 gap-6">
              <div class="col-span-6 sm:col-span-3">
                <label for="name" class="block text-sm font-medium text-gray-700">Nom</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  v-model="form.name"
                  class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                />
              </div>

              <div class="col-span-6 sm:col-span-3">
                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  v-model="form.email"
                  class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                />
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
            <button
              type="submit"
              class="inline-flex justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Enregistrer
            </button>
          </div>
        </div>
      </form>

      <form @submit.prevent="handlePasswordSubmit">
        <div class="shadow sm:overflow-hidden sm:rounded-md">
          <div class="space-y-6 bg-white py-6 px-4 sm:p-6">
            <div>
              <h3 class="text-lg font-medium leading-6 text-gray-900">Changer le mot de passe</h3>
              <p class="mt-1 text-sm text-gray-500">
                Assurez-vous d'utiliser un mot de passe fort que vous n'utilisez nulle part ailleurs.
              </p>
            </div>

            <div class="grid grid-cols-6 gap-6">
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="current_password"
                  class="block text-sm font-medium text-gray-700"
                >
                  Mot de passe actuel
                </label>
                <input
                  type="password"
                  name="current_password"
                  id="current_password"
                  v-model="passwordForm.currentPassword"
                  class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                />
              </div>

              <div class="col-span-6 sm:col-span-3">
                <label for="new_password" class="block text-sm font-medium text-gray-700">
                  Nouveau mot de passe
                </label>
                <input
                  type="password"
                  name="new_password"
                  id="new_password"
                  v-model="passwordForm.newPassword"
                  class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                />
              </div>

              <div class="col-span-6 sm:col-span-3">
                <label
                  for="confirm_password"
                  class="block text-sm font-medium text-gray-700"
                >
                  Confirmer le nouveau mot de passe
                </label>
                <input
                  type="password"
                  name="confirm_password"
                  id="confirm_password"
                  v-model="passwordForm.confirmPassword"
                  class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                />
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
            <button
              type="submit"
              class="inline-flex justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Mettre à jour le mot de passe
            </button>
          </div>
        </div>
      </form>

      <form @submit.prevent="handleNotificationsSubmit">
        <div class="shadow sm:overflow-hidden sm:rounded-md">
          <div class="space-y-6 bg-white py-6 px-4 sm:p-6">
            <div>
              <h3 class="text-lg font-medium leading-6 text-gray-900">Notifications</h3>
              <p class="mt-1 text-sm text-gray-500">
                Gérez la façon dont vous souhaitez être notifié.
              </p>
            </div>

            <div class="space-y-4">
              <div class="flex items-start">
                <div class="flex h-5 items-center">
                  <input
                    id="email_notifications"
                    name="email_notifications"
                    type="checkbox"
                    v-model="notificationsForm.email"
                    class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                </div>
                <div class="ml-3">
                  <label for="email_notifications" class="text-sm font-medium text-gray-700">
                    Notifications par email
                  </label>
                  <p class="text-sm text-gray-500">
                    Recevez des notifications par email pour les mises à jour importantes.
                  </p>
                </div>
              </div>

              <div class="flex items-start">
                <div class="flex h-5 items-center">
                  <input
                    id="marketing_notifications"
                    name="marketing_notifications"
                    type="checkbox"
                    v-model="notificationsForm.marketing"
                    class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                </div>
                <div class="ml-3">
                  <label for="marketing_notifications" class="text-sm font-medium text-gray-700">
                    Emails marketing
                  </label>
                  <p class="text-sm text-gray-500">
                    Recevez des emails sur les nouveaux produits, fonctionnalités et plus encore.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
            <button
              type="submit"
              class="inline-flex justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Enregistrer les préférences
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const user = auth.user

const form = ref({
  name: user?.name || '',
  email: user?.email || '',
  avatar: user?.avatar || ''
})

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const notificationsForm = ref({
  email: true,
  marketing: false
})

async function handleSubmit() {
  try {
    // TODO: Update profile
    console.log('Profile updated:', form.value)
  } catch (error) {
    console.error('Error updating profile:', error)
  }
}

async function handlePasswordSubmit() {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    // TODO: Show error message
    return
  }

  try {
    // TODO: Update password
    console.log('Password updated')
    passwordForm.value = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  } catch (error) {
    console.error('Error updating password:', error)
  }
}

async function handleNotificationsSubmit() {
  try {
    // TODO: Update notifications preferences
    console.log('Notifications preferences updated:', notificationsForm.value)
  } catch (error) {
    console.error('Error updating notifications preferences:', error)
  }
}
</script> 