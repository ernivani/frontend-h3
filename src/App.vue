<template>
  <router-view v-slot="{ Component, route }">
    <component :is="route.meta.layout || DefaultLayout">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </component>
  </router-view>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from './stores/auth'
import DefaultLayout from './layouts/DefaultLayout.vue'
import AuthLayout from './layouts/AuthLayout.vue'

const auth = useAuthStore()

onMounted(async () => {
  if (auth.token) {
    await auth.checkAuth()
  }
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

