<script lang="ts" setup>
  import { RouterLink } from 'vue-router';
  import ThePicture from './ThePicture.vue';
  import TheButton from './TheButton.vue';
  import axios from 'axios';

  defineProps({
    films: {
      type: Array
    },
    isCounter: {
      type: Boolean
    },
    isGenre: {
      type: Boolean
    }
  });

  const emit = defineEmits(['getNewMovies']);

  const getNewMovies = () => {
    emit('getNewMovies');
  };

  const deleteMovie = async (id: number): Promise<void> => {
    await axios.delete(`https://cinemaguide.skillbox.cc/favorites/${id}`, { withCredentials: true })
      .then(() => {
        getNewMovies();
      })
      .catch(error => {
        console.log(error);
      });
  };
</script>

<template>
  <ul class="film-list">
    <li class="film-list__item" v-for="(film, index) in films" :key="index">
      <span class="film-list__count" v-if="isCounter">{{ index + 1 }}</span>
      <router-link class="film-list__link" tag="a" :to="`/movie/${film.id}`">
        <ThePicture
          class="film-list__img"
          :img-path="film.posterUrl"
        />
      </router-link>
      <TheButton class="film-list__delete" tabindex="-1" v-if="!isCounter && !isGenre" @click="deleteMovie(film.id)" />
    </li>
  </ul>
</template>
