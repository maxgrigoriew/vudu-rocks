<script setup lang="ts">
import { onMounted, watch } from 'vue';
import AppHeader from '@/components/AppHeader/AppHeader.vue';
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
  <app-header>
    <is-input v-model="store.searchQuery" placeholder="Name" />
  </app-header>

  <div class="container">
    <post-list :posts="store.concatArray" />
    <pagination-list
      style="margin-top: 40px"
      :pages="store.pages"
      :currentPage="store.currentPage"
      @fetchData="store.fetchPosts"
    />
    <is-loader v-if="store.isLoading" />
  </div>
</template>
