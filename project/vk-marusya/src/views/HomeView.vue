<script lang="ts" setup>
  import Container from '@/components/TheContainer.vue';
  import Hero from '@/components/TheHero.vue';
  import FilmList from '@/components/FilmList.vue';
  import axios from 'axios';
  import { onMounted, ref } from 'vue';

  const topFilms = ref([])

  const getData = async () => {
    try {
      const response = await axios.get('https://cinemaguide.skillbox.cc/movie/top10');
      return response.data;
    } catch {
      return [];
    }
  };

  onMounted(async () => {
    topFilms.value = await getData();
  });
</script>

<template>
  <main class="main">
    <Hero />

    <section class="top-films">
      <Container>
        <h2 class="top-films__title">Топ 10&nbsp;фильмов</h2>
        <FilmList :films="topFilms" :isCounter="true" />
      </Container>
    </section>
  </main>
</template>
