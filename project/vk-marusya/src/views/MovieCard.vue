<script lang="ts" setup>
  import Container from '@/components/TheContainer.vue';
  import FilmCard from '@/components/FilmCard.vue';
  import { useRoute } from 'vue-router';
  import { onMounted, ref, computed } from 'vue';
  import axios from 'axios';
  import movieInfo from '@/data/MovieInfo';
  import { useAuthUserStore } from '@/stores/AuthUser';
  import { useIsFavoriteStore } from '@/stores/IsFavorite';

  const route = useRoute();
  const movieId = route.params.id;
  const favoriteMovies = ref([]);
  const userAuth = useAuthUserStore();
  const isFavorite = useIsFavoriteStore();

  const movie = ref({
    id: '',
    tmdbRating: '',
    releaseYear: '',
    genres: [],
    runtime: '',
    title: '',
    plot: '',
    backdropUrl: '',
    trailerYouTubeId: '',
    language: '',
    budget: '',
    revenue: '',
    director: '',
    production: '',
    awardsSummary: ''
  });

  const filteredInfo = computed(() => {
    return movieInfo.filter(item => movie.value[item.systemName] != null);
  });

  const formatPrice = (field: string) => {
    if (field === 'budget' || field === 'revenue') {
      return movie.value[field].toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' руб.';
    } else {
      return movie.value[field];
    }
  }

  const getMovie = async (): Promise<void> => {
    await axios.get(`https://cinemaguide.skillbox.cc/movie/${movieId}`)
      .then(response => {
        movie.value = response.data;
      })
  };

  const getFavoriteMovies = async (): Promise<void> => {
    if (userAuth.isAuth) {
      await axios.get('https://cinemaguide.skillbox.cc/favorites', { withCredentials: true })
        .then(response => {
          favoriteMovies.value = response.data;

          const movieExist = favoriteMovies.value.some(item => item.id === Number(movie.value.id))
          if (movieExist) {
            isFavorite.isFavorite = true;
          } else {
            isFavorite.isFavorite = false;
          }
        })
        .catch(error => {
          console.log(error);
        })
    }
  };

  onMounted(() => {
    getMovie()
    getFavoriteMovies()
  });
</script>

<template>
  <Container>
    <div class="movie-card">
      <FilmCard
        :id="movie.id"
        :rating="movie.tmdbRating"
        :release="movie.releaseYear"
        :genre="movie.genres"
        :runtime="movie.runtime"
        :title="movie.title"
        :description="movie.plot"
        :hero=false
        :image-path="movie.backdropUrl"
        :trailer-you-tube-id="movie.trailerYouTubeId"
      />
      <div class="movie-card__wrapper">
        <h2 class="movie-card__title">О&nbsp;фильме</h2>
        <ul class="movie-card__list">
          <li class="movie-card__item" v-for="item in filteredInfo" :key="item.systemName">
            <div class="movie-card__inner">
              <span class="movie-card__key">{{ item.renderName }}</span>
              <span class="movie-card__line"></span>
            </div>
            <span class="movie-card__value">{{ formatPrice(item.systemName) }}</span>
          </li>
        </ul>
      </div>
    </div>
  </Container>
</template>
