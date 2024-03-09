<script setup lang="ts">
import type { Post } from '@/types';

interface Props {
  post: Post;
}
const props = defineProps<Props>();
</script>

<template>
  <div :class="$style.post">
    <div :class="$style.post__title">{{ post.title }}</div>
    <p :class="$style.post__body">{{ post.body }}</p>
    <p :class="$style.post__author">{{ post.authorName }}</p>
  </div>
</template>

<style module src="./PostListItem.scss"></style>
