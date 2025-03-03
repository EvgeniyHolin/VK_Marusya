import HomeView from '@/views/HomeView.vue';
// import GenresView from '@/views/AllGenresView.vue';
import ProfileView from '@/views/ProfileView.vue';
import FavoriteView from '@/views/FavoriteView.vue';
import { createRouter, createWebHistory } from 'vue-router';
import ProfileInfo from '@/views/ProfileInfo.vue';
import MovieCard from '@/views/MovieCard.vue';
import MovieWrapper from '@/views/MovieWrapper.vue';
// import GenreView from '@/views/GenreView.vue';

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
      component: ProfileView,
      redirect: { name: 'favorites' },
      children: [
        {
          path: 'favorites',
          name: 'favorites',
          component: FavoriteView
        },
        {
          path: 'info',
          name: 'info',
          component: ProfileInfo
        }
      ]
    },
    {
      path: '/movie',
      name: 'movie',
      component: MovieWrapper,
    },
    {
      path: '/movie/:id',
      name: 'moviePage',
      component: MovieCard
    },
  ],
})

export default router
