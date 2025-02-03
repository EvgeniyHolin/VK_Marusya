import HomeView from '@/views/HomeView.vue';
import GenresView from '@/views/GenresView.vue';
import ProfileView from '@/views/ProfileView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/movie/genres',
      name: 'genres',
      component: GenresView
    },
  ],
})

export default router
