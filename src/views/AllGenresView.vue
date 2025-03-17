<script lang="ts" setup>
  import Container from '@/components/TheContainer.vue';
  import ThePicture from '@/components/ThePicture.vue';
  import genreImages from '@/data/genre-images';
  import genresInfo from '@/data/genres-info';
  import axios from 'axios';
  import { onMounted, ref, computed } from 'vue';
  import { RouterLink } from 'vue-router';

  const genres = ref([]);

  const filteredGenres = computed(() => {
    return genresInfo.filter(genre => genres.value.includes(genre.systemName));
  });

  const getGenres = async (): Promise<void> => {
    await axios.get('https://cinemaguide.skillbox.cc/movie/genres')
      .then(response => {
        genres.value = response.data;
      })
      .catch(error => {
        console.log(error);
      })
  };

  const imageGenre = (name: string): string | undefined => {
    return genreImages.find(item => item.systemName === name)?.imagePath;
  };

  onMounted(getGenres);
</script>

<template>
  <section class="genres">
    <Container>
      <div class="genres__wrapper">
        <h2 class="genres__title">Жанры фильмов</h2>
        <ul class="genres__list">
          <li class="genres__item" v-for="genre in filteredGenres" :key="genre.systemName">
            <router-link class="genres__card" tag="div" :to="{ path: '/movie', query: { genre: genre.systemName } }">
              <ThePicture
                :img-path="imageGenre(genre.systemName)"
                class-name="genres__image"
              />
              <span class="genres__subtitle">{{ genre.renderName }}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </Container>
  </section>
</template>
