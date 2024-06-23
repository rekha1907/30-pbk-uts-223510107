import { createRouter, createWebHistory } from 'vue-router';
import Post from '../components/Post.vue';
import Todos from '../components/Todos.vue';
import Albums from '../components/Albums.vue';

const routes = [
  {
    path: '/',
    redirect: '/post',
  },
  {
    path: '/post',
    name: 'Post',
    component: Post,
  },
  {
    path: '/todos',
    name: 'Todos',
    component: Todos,
  },
  {
    path: '/albums',
    name: 'Albums',
    component: Albums,
  },
  {
    path: '/albums/:id',
    name: 'AlbumDetail',
    component: Albums,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
