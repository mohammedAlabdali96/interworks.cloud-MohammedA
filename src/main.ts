import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';
import App from './App.vue';
import './assets/main.css';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: App
    }
  ]
});

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router); // Must be added before mounting
app.mount('#app');
