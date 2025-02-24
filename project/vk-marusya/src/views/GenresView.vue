<script lang="ts" setup>
  import Container from '@/components/TheContainer.vue';
  import axios from 'axios';
  import { onMounted, ref } from 'vue';

  const genres = ref([])

  const getData = async () => {
    try {
      const response = await axios.get('https://cinemaguide.skillbox.cc/movie/genres');
      genres.value = response.data;
    } catch {
      return [];
    }
  };

  onMounted(getData);
</script>

<template>
  <main class="main">
    <section class="genres">
      <Container>
        <div class="genres__wrapper">
          <h2 class="genres__title">Жанры фильмов</h2>
          <ul class="genres__list">
            <li class="genres__item" v-for="(genre, index) in genres" :key="index">{{ genre }}</li>
          </ul>
        </div>
      </Container>
    </section>
  </main>
</template>
