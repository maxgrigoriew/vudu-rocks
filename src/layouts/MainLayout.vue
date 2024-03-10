<script setup lang="ts">
import AppHeader from '@/components/AppHeader/AppHeader.vue';
</script>
<template>
  <div class="wrapper-header">
    <app-header>
      <is-input v-model="store.searchQuery" placeholder="Name" />
    </app-header>
  </div>
  <div class="container">
    <main class="main">
      <slot />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.main {
  padding-top: 40px;
}
.wrapper-header {
  position: sticky;
  top: 0;
  z-index: 40;
}
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0 20px;
}
</style>
