<template>
  <div>
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-2xl font-semibold text-gray-900">Utilisateurs</h1>
        <p class="mt-2 text-sm text-gray-700">
          Liste de tous les utilisateurs inscrits sur la plateforme.
        </p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button
          @click="showAddModal = true"
          class="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:w-auto"
        >
          Ajouter un utilisateur
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div class="mt-8 sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <div class="flex space-x-4">
          <div class="flex-1">
            <label for="search" class="sr-only">Rechercher</label>
            <input
              type="text"
              name="search"
              id="search"
              v-model="filters.search"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              placeholder="Rechercher un utilisateur..."
            />
          </div>
          <div class="w-48">
            <select
              v-model="filters.role"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            >
              <option value="">Tous les rôles</option>
              <option value="admin">Admin</option>
              <option value="user">Utilisateur</option>
            </select>
          </div>
          <div class="w-48">
            <select
              v-model="filters.status"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            >
              <option value="">Tous les statuts</option>
              <option value="active">Actif</option>
              <option value="inactive">Inactif</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Users list -->
    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Utilisateur
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Rôle
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Statut
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Dernière connexion
                  </th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span class="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="user in filteredUsers" :key="user.id">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6">
                    <div class="flex items-center">
                      <div class="h-10 w-10 flex-shrink-0">
                        <img
                          :src="user.avatar"
                          :alt="user.name"
                          class="h-10 w-10 rounded-full"
                        />
                      </div>
                      <div class="ml-4">
                        <div class="font-medium text-gray-900">{{ user.name }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ user.email }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <span
                      class="inline-flex rounded-full px-2 text-xs font-semibold leading-5"
                      :class="{
                        'bg-purple-100 text-purple-800': user.role === 'admin',
                        'bg-blue-100 text-blue-800': user.role === 'user'
                      }"
                    >
                      {{ user.role }}
                    </span>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm">
                    <span
                      class="inline-flex rounded-full px-2 text-xs font-semibold leading-5"
                      :class="{
                        'bg-green-100 text-green-800': user.status === 'active',
                        'bg-gray-100 text-gray-800': user.status === 'inactive'
                      }"
                    >
                      {{ user.status }}
                    </span>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ user.lastLogin }}
                  </td>
                  <td
                    class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
                  >
                    <button
                      @click="editUser(user)"
                      class="text-primary hover:text-primary-600 mr-4"
                    >
                      Modifier
                    </button>
                    <button
                      @click="deleteUser(user)"
                      class="text-red-600 hover:text-red-900"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <div v-if="showAddModal || showEditModal" class="fixed inset-0 z-10 overflow-y-auto">
      <div
        class="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div
          class="relative inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle"
        >
          <div>
            <div class="mt-3 text-center sm:mt-5">
              <h3 class="text-lg font-medium leading-6 text-gray-900">
                {{ showEditModal ? "Modifier l'utilisateur" : 'Ajouter un utilisateur' }}
              </h3>
              <div class="mt-2">
                <form @submit.prevent="handleSubmit" class="space-y-4">
                  <div>
                    <label for="name" class="block text-sm font-medium text-gray-700">
                      Nom
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      v-model="form.name"
                      required
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    />
                  </div>

                  <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      v-model="form.email"
                      required
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    />
                  </div>

                  <div>
                    <label for="role" class="block text-sm font-medium text-gray-700">
                      Rôle
                    </label>
                    <select
                      id="role"
                      name="role"
                      v-model="form.role"
                      required
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    >
                      <option value="admin">Admin</option>
                      <option value="user">Utilisateur</option>
                    </select>
                  </div>

                  <div>
                    <label for="status" class="block text-sm font-medium text-gray-700">
                      Statut
                    </label>
                    <select
                      id="status"
                      name="status"
                      v-model="form.status"
                      required
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    >
                      <option value="active">Actif</option>
                      <option value="inactive">Inactif</option>
                    </select>
                  </div>

                  <div v-if="!showEditModal">
                    <label for="password" class="block text-sm font-medium text-gray-700">
                      Mot de passe
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      v-model="form.password"
                      required
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
            <button
              type="submit"
              @click="handleSubmit"
              class="inline-flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:col-start-2 sm:text-sm"
            >
              {{ showEditModal ? 'Enregistrer' : 'Ajouter' }}
            </button>
            <button
              type="button"
              @click="closeModal"
              class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const users = ref([
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-03-15 14:30',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
    status: 'active',
    lastLogin: '2024-03-14 09:15',
    avatar: 'https://ui-avatars.com/api/?name=Jane+Smith'
  },
  {
    id: 3,
    name: 'Bob Wilson',
    email: 'bob@example.com',
    role: 'user',
    status: 'inactive',
    lastLogin: '2024-03-10 16:45',
    avatar: 'https://ui-avatars.com/api/?name=Bob+Wilson'
  }
])

const filters = ref({
  search: '',
  role: '',
  status: ''
})

const showAddModal = ref(false)
const showEditModal = ref(false)
const editingUser = ref(null)

const form = ref({
  name: '',
  email: '',
  role: 'user',
  status: 'active',
  password: ''
})

const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const matchesSearch = !filters.value.search || 
      user.name.toLowerCase().includes(filters.value.search.toLowerCase()) ||
      user.email.toLowerCase().includes(filters.value.search.toLowerCase())
    
    const matchesRole = !filters.value.role || 
      user.role === filters.value.role
    
    const matchesStatus = !filters.value.status || 
      user.status === filters.value.status

    return matchesSearch && matchesRole && matchesStatus
  })
})

function editUser(user) {
  editingUser.value = user
  form.value = { ...user }
  showEditModal.value = true
}

function deleteUser(user) {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
    const index = users.value.findIndex(u => u.id === user.id)
    if (index !== -1) {
      users.value.splice(index, 1)
    }
  }
}

function handleSubmit() {
  if (showEditModal.value) {
    const index = users.value.findIndex(u => u.id === editingUser.value.id)
    if (index !== -1) {
      users.value[index] = {
        ...editingUser.value,
        ...form.value
      }
    }
  } else {
    users.value.push({
      id: users.value.length + 1,
      ...form.value,
      lastLogin: '-',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(form.value.name)}`
    })
  }
  closeModal()
}

function closeModal() {
  showAddModal.value = false
  showEditModal.value = false
  editingUser.value = null
  form.value = {
    name: '',
    email: '',
    role: 'user',
    status: 'active',
    password: ''
  }
}
</script> 