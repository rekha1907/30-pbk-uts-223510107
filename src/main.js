import { createApp } from 'vue';
import { Quasar } from 'quasar';
import { createPinia } from 'pinia';
import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/src/css/index.sass';
import './index.css'

import App from './App.vue';
import router from './router'; 
import { useTodosStore } from './store/todos';

const myApp = createApp(App);
const pinia = createPinia();

myApp.use(Quasar, {
  plugins: {},
});
myApp.use(pinia);
myApp.provide('$todosStore', useTodosStore());
myApp.use(router);
myApp.mount('#app');
