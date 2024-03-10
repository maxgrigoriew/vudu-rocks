import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'posts',
    component: () => import('./pages/PostsPage.vue'),
    meta: {
      layout: 'MainLayout',
    },
  },
  {
    path: '/:/id',
    name: 'post',
    component: () => import('./pages/PostPage.vue'),
    meta: {
      layout: 'MainLayout',
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
