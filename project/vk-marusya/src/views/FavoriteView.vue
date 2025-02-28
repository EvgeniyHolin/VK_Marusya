<script lang="ts" setup>
  import FilmList from '@/components/FilmList.vue';
  import axios from 'axios';
  import { onMounted, ref } from 'vue';

  const movies = ref([]);
  const isLoading = ref(true);

  const getFavoriteMovies = async () => {
    await axios.get('https://cinemaguide.skillbox.cc/favorites', { withCredentials: true })
      .then(response => {
        movies.value = response.data;
        isLoading.value = false;
      })
      .catch(error => {
        console.log(error);
      })
  };

  onMounted(getFavoriteMovies);
</script>

<template>
  <div class="favorite">
    <span class="favorite__loading" v-if="isLoading">Загрузка...</span>
    <div class="favorite__movies" v-else>
      <span class="favorite__empty" v-if="movies.length <= 0">В списке избранного пока ничего нет</span>
      <FilmList v-else :films="movies" @get-new-movies="getFavoriteMovies" />
    </div>
  </div>
</template>
