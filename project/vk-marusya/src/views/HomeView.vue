<script lang="ts" setup>
  import Container from '@/components/TheContainer.vue';
  import Hero from '@/components/TheHero.vue';
  import ThePicture from '@/components/ThePicture.vue';
  import axios from 'axios';
  import { onMounted, ref } from 'vue';
  import { RouterLink } from 'vue-router';

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
        <ul class="top-films__list">
          <li class="top-films__item" v-for="(film, index) in topFilms" :key="index">
            <span class="top-films__count">{{ index + 1 }}</span>
            <router-link class="top-films__link" tag="a" to="#">
              <ThePicture
                class="top-films__img"
                :img-path="film.posterUrl"
              />
            </router-link>
          </li>
        </ul>
      </Container>
    </section>
  </main>
</template>
