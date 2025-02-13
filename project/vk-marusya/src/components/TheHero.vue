<script lang="ts" setup>
  import axios from 'axios';
  import Container from './TheContainer.vue';
  import { onMounted, ref } from 'vue';
  import FilmCard from './FilmCard.vue';

  const movie = ref({
    id: '',
    tmdbRating: '',
    releaseYear: '',
    genres: [],
    runtime: '',
    title: '',
    plot: '',
    backdropUrl: '',
    trailerUrl: ''
  });

  const formatRating = (rating: string): string => {
    return `${Number(rating).toFixed(1)}`
  };

  const formatRuntime = (time: string): string => {
    return `${Math.floor(+time / 60)} ч ${+time % 60} мин`
  }

  const formatGenre = (genres: Array<string>): string => {
    return genres[0];
  };

  const formatDescr = (descr: string): string => {
    if (descr.length > 200) {
      return descr.slice(0, 200) + '...';
    };

    return descr;
  }

  const getData = async () => {
    try {
      const response = await axios.get('https://cinemaguide.skillbox.cc/movie/random');
      return response.data;
    } catch {
      return [];
    }
  };

  const getRandomFilm = async () => {
    movie.value = await getData();
  };

  onMounted(async () => {
    getRandomFilm()
  });
</script>

<template>
  <section class="hero">
    <Container>
      <div class="hero__wrapper">
        <FilmCard
          :id="movie.id"
          :rating="formatRating(movie.tmdbRating)"
          :release="movie.releaseYear"
          :genre="formatGenre(movie.genres)"
          :runtime="formatRuntime(movie.runtime)"
          :title="movie.title"
          :description="formatDescr(movie.plot)"
          :hero="true"
          :image-path="movie.backdropUrl"
          @get-new-film="getRandomFilm"
        />
      </div>
    </Container>
  </section>
</template>
