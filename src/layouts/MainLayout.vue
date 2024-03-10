<script setup lang="ts">
import AppHeader from '../components/AppHeader/AppHeader.vue';
</script>
<template>
  <div>
    <div class="wrapper-header">
      <div class="container">
        <AppHeader />
      </div>
    </div>
    <div class="container">
      <main class="main">
        <slot />
      </main>
    </div>
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
