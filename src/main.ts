// @ts-ignore
import vClickOutside from 'click-outside-vue3';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from '@/App.vue';
import components from '@/globalComponents/index';
import router from './router';
import './assets/scss/main.scss';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(vClickOutside);
Object.entries(components).forEach(([name, component]) =>
  app.component(name, component),
);
app.mount('#app');
