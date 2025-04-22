<template>
  <div>
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-2xl font-semibold text-gray-900">Commandes</h1>
        <p class="mt-2 text-sm text-gray-700">
          Liste de toutes les commandes passées sur la plateforme.
        </p>
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
              placeholder="Rechercher une commande..."
            />
          </div>
          <div class="w-48">
            <select
              v-model="filters.status"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            >
              <option value="">Tous les statuts</option>
              <option value="completed">Complétée</option>
              <option value="pending">En attente</option>
              <option value="failed">Échouée</option>
              <option value="refunded">Remboursée</option>
            </select>
          </div>
          <div class="w-48">
            <select
              v-model="filters.period"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            >
              <option value="">Toutes les périodes</option>
              <option value="today">Aujourd'hui</option>
              <option value="week">Cette semaine</option>
              <option value="month">Ce mois</option>
              <option value="year">Cette année</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Orders list -->
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
                    Commande
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Client
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Produit
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Prix
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Statut
                  </th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span class="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="order in filteredOrders" :key="order.id">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6">
                    <div class="flex items-center">
                      <div class="font-medium text-gray-900">#{{ order.id }}</div>
                    </div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <div class="flex items-center">
                      <div class="h-8 w-8 flex-shrink-0">
                        <img
                          :src="order.customer.avatar"
                          :alt="order.customer.name"
                          class="h-8 w-8 rounded-full"
                        />
                      </div>
                      <div class="ml-4">
                        <div class="font-medium text-gray-900">
                          {{ order.customer.name }}
                        </div>
                        <div class="text-gray-500">{{ order.customer.email }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ order.product.name }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ order.price }}€
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ order.date }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm">
                    <span
                      class="inline-flex rounded-full px-2 text-xs font-semibold leading-5"
                      :class="{
                        'bg-green-100 text-green-800': order.status === 'completed',
                        'bg-yellow-100 text-yellow-800': order.status === 'pending',
                        'bg-red-100 text-red-800': order.status === 'failed',
                        'bg-gray-100 text-gray-800': order.status === 'refunded'
                      }"
                    >
                      {{ order.status }}
                    </span>
                  </td>
                  <td
                    class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
                  >
                    <button
                      @click="viewOrder(order)"
                      class="text-primary hover:text-primary-600 mr-4"
                    >
                      Voir
                    </button>
                    <button
                      v-if="order.status === 'completed'"
                      @click="refundOrder(order)"
                      class="text-red-600 hover:text-red-900"
                    >
                      Rembourser
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Order details modal -->
    <div v-if="showOrderModal" class="fixed inset-0 z-10 overflow-y-auto">
      <div
        class="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div
          class="relative inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle"
        >
          <div>
            <div class="mt-3 sm:mt-5">
              <h3 class="text-lg font-medium leading-6 text-gray-900">
                Détails de la commande #{{ selectedOrder?.id }}
              </h3>
              <div class="mt-2">
                <div class="mt-6 border-t border-gray-100">
                  <dl class="divide-y divide-gray-100">
                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt class="text-sm font-medium leading-6 text-gray-900">Client</dt>
                      <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {{ selectedOrder?.customer.name }}
                      </dd>
                    </div>
                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt class="text-sm font-medium leading-6 text-gray-900">Email</dt>
                      <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {{ selectedOrder?.customer.email }}
                      </dd>
                    </div>
                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt class="text-sm font-medium leading-6 text-gray-900">Produit</dt>
                      <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {{ selectedOrder?.product.name }}
                      </dd>
                    </div>
                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt class="text-sm font-medium leading-6 text-gray-900">Prix</dt>
                      <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {{ selectedOrder?.price }}€
                      </dd>
                    </div>
                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt class="text-sm font-medium leading-6 text-gray-900">Date</dt>
                      <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {{ selectedOrder?.date }}
                      </dd>
                    </div>
                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt class="text-sm font-medium leading-6 text-gray-900">Statut</dt>
                      <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        <span
                          class="inline-flex rounded-full px-2 text-xs font-semibold leading-5"
                          :class="{
                            'bg-green-100 text-green-800': selectedOrder?.status === 'completed',
                            'bg-yellow-100 text-yellow-800': selectedOrder?.status === 'pending',
                            'bg-red-100 text-red-800': selectedOrder?.status === 'failed',
                            'bg-gray-100 text-gray-800': selectedOrder?.status === 'refunded'
                          }"
                        >
                          {{ selectedOrder?.status }}
                        </span>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-5 sm:mt-6">
            <button
              type="button"
              @click="closeOrderModal"
              class="inline-flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:text-sm"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const orders = ref([
  {
    id: '12345',
    customer: {
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://ui-avatars.com/api/?name=John+Doe'
    },
    product: {
      name: 'Product Analytics Pro'
    },
    price: 49.99,
    date: '2024-03-15',
    status: 'completed'
  },
  {
    id: '12344',
    customer: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      avatar: 'https://ui-avatars.com/api/?name=Jane+Smith'
    },
    product: {
      name: 'Team Chat Pro'
    },
    price: 29.99,
    date: '2024-03-14',
    status: 'pending'
  },
  {
    id: '12343',
    customer: {
      name: 'Bob Wilson',
      email: 'bob@example.com',
      avatar: 'https://ui-avatars.com/api/?name=Bob+Wilson'
    },
    product: {
      name: 'Email Marketing Suite'
    },
    price: 39.99,
    date: '2024-03-13',
    status: 'failed'
  }
])

const filters = ref({
  search: '',
  status: '',
  period: ''
})

const showOrderModal = ref(false)
const selectedOrder = ref(null)

const filteredOrders = computed(() => {
  return orders.value.filter(order => {
    const matchesSearch = !filters.value.search || 
      order.customer.name.toLowerCase().includes(filters.value.search.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(filters.value.search.toLowerCase()) ||
      order.id.includes(filters.value.search)
    
    const matchesStatus = !filters.value.status || 
      order.status === filters.value.status

    // TODO: Implement period filtering
    const matchesPeriod = !filters.value.period

    return matchesSearch && matchesStatus && matchesPeriod
  })
})

function viewOrder(order) {
  selectedOrder.value = order
  showOrderModal.value = true
}

function closeOrderModal() {
  showOrderModal.value = false
  selectedOrder.value = null
}

function refundOrder(order) {
  if (confirm('Êtes-vous sûr de vouloir rembourser cette commande ?')) {
    const index = orders.value.findIndex(o => o.id === order.id)
    if (index !== -1) {
      orders.value[index] = {
        ...order,
        status: 'refunded'
      }
    }
  }
}
</script> 