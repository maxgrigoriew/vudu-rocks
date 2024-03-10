<template>
  <div>123</div>
  <component :is="layout" />
</template>
<script>
import MainLayout from './layouts/MainLayout.vue';

export default {
  components: {
    MainLayout,
  },
  mounted() {
    console.log(this.$route);
  },
  computed: {
    layout() {
      return () => import(`@/layouts/${this.$route.meta.layout}.vue`);
    },
  },
};
</script>
