<script setup lang="ts">
import { onMounted, watch } from 'vue';
import PostList from '@/components/PostList/PostList.vue';
import useStore from '@/store/use-store';
import { debounce } from '@/utils/debounce';

const store = useStore();
watch(
  () => store.searchQuery,
  debounce((newVal: string) => {
    store.setSearchQuery(newVal);
    store.getAuthorsAndPosts();
  }, 500),
);

onMounted(() => {
  store.getAuthorsAndPosts();
});
</script>

<template>
  <post-list :posts="store.concatArray" />
  <pagination-list
    style="margin-top: 40px"
    :pages="store.pages"
    :currentPage="store.currentPage"
    @fetchData="store.fetchPosts"
  />
  <is-loader v-if="store.isLoading" />
</template>
