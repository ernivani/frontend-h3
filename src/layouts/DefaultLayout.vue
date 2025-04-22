<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    <main>
      <div >
        <slot></slot>
      </div>
    </main>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
</script> 