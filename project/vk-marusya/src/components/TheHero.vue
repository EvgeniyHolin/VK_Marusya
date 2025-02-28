<script lang="ts" setup>
  import axios from 'axios';
  import Container from './TheContainer.vue';
  import { onMounted, ref } from 'vue';
  import FilmCard from './FilmCard.vue';
  import { useIsFavoriteStore } from '@/stores/IsFavorite';

  const movie = ref({
    id: '',
    tmdbRating: '',
    releaseYear: '',
    genres: [],
    runtime: '',
    title: '',
    plot: '',
    backdropUrl: '',
    trailerYouTubeId: ''
  });

  const favoriteMovies = ref([]);
  const isFavorite = useIsFavoriteStore();

  const getRandomFilm = async (): Promise<void> => {
    await axios.get('https://cinemaguide.skillbox.cc/movie/random')
      .then(async response => {
        movie.value = response.data;

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
      })
  };

  onMounted(getRandomFilm);
</script>

<template>
  <section class="hero">
    <Container>
      <div class="hero__wrapper">
        <FilmCard
          :id="movie.id"
          :rating="movie.tmdbRating"
          :release="movie.releaseYear"
          :genre="movie.genres"
          :runtime="movie.runtime"
          :title="movie.title"
          :description="movie.plot"
          :hero=true
          :image-path="movie.backdropUrl"
          :trailer-you-tube-id="movie.trailerYouTubeId"
          @get-new-film="getRandomFilm"
        />
      </div>
    </Container>
  </section>
</template>
