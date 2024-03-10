<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useStore from '@/store/use-store';

const route = useRoute();
const router = useRouter();
const store = useStore();

onMounted(() => {
  store.getOnePost(route.params.id.toString());
});
</script>
<template>
  <div>
    <button type="button" @click="router.go(-1)">button</button>
    <div>{{ store.onePost?.title }}</div>
    <div>{{ store.onePost?.body }}</div>
  </div>
  <is-loader v-if="store.isLoading" />
</template>
