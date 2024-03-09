<script setup lang="ts">
import { onMounted, watch } from 'vue';
import AppHeader from '@/components/AppHeader/AppHeader.vue';
import PostList from '@/components/PostList/PostList.vue';
import useStore from './store/use-store';
import { debounce } from './utils/debounce';

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
  <AppHeader />
  <div class="container">
    <div class="inputs">
      <is-input v-model="store.searchQuery" placeholder="Name" />
    </div>

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

<style scoped lang="scss">
.inputs {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-bottom: 45px;
}

.author-select {
  z-index: 4;
}

.location-select {
  z-index: 3;
}

@media (min-width: 768px) {
  .inputs {
    flex-direction: row;
    gap: 20px;
  }
}
</style>
