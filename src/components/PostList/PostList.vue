<script setup lang="ts">
import type { Post } from '@/types';
import PostListItem from '../PostListItem/PostListItem.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

interface Props {
  posts: Post[];
}
const props = defineProps<Props>();

const onClick = (id: number) => {
  router.push({ name: 'post', params: { id } });
};
</script>

<template>
  <div v-if="props.posts.length" :class="$style.postList">
    <post-list-item
      v-for="post in posts"
      :key="post.id"
      :post="post"
      @click="onClick(post.id)"
    />
  </div>
  <div v-else :class="$style.PostList">Список пуст</div>
</template>
<style module src="./PostList.scss"></style>
