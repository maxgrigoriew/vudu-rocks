<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
</script>
<template>
  <div>
    <button type="button" @click="router.push('/')">button</button>
    <div>Страница не найдена</div>
  </div>
</template>
