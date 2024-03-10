<script setup lang="ts">
import { onMounted, watch } from 'vue';
import PostList from '@/components/PostList/PostList.vue';
import useStore from '@/store/use-store';

const store = useStore();
watch(() => store.searchQuery, store.filtredPosts);
onMounted(() => {
  store.getAuthorsAndPosts();
});
</script>

<template>
  <div class="input-wrapper">
    <is-input v-model="store.searchQuery" placeholder="Поиск..." />
  </div>
  <post-list :posts="store.filtredPosts" />
  <pagination-list
    style="margin-top: 40px"
    :pages="store.pages"
    :currentPage="store.currentPage"
    @fetchData="store.fetchPosts"
  />
  <is-loader v-if="store.isLoading" />
</template>
<style>
.input-wrapper {
  display: flex;
  justify-content: center;
}
</style>
