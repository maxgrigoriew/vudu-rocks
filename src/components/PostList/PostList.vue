<script setup lang="ts">
import type { Post } from '@/types';
import PostListItem from '../PostListItem/PostListItem.vue';

interface Props {
  posts: Post[];
}
const props = defineProps<Props>();
</script>

<template>
  <div v-if="props.posts.length" :class="$style.postList">
    <post-list-item v-for="post in posts" :key="post.id" :post="post" />
  </div>
  <div v-else :class="$style.PostList">Список пуст</div>
</template>
<style module src="./PostList.scss"></style>
