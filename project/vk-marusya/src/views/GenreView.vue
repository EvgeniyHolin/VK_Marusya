<script lang="ts" setup>
  import Container from '@/components/TheContainer.vue';
  import { RouterLink, useRoute } from 'vue-router';
  import genresInfo from '@/data/genres-info';
  import { computed, onMounted, ref } from 'vue';
  import IconPrevArrow from '@/assets/icons/icon-prev-arrow.svg';
  import axios from 'axios';
  import FilmList from '@/components/FilmList.vue';
  import TheButton from '@/components/TheButton.vue';

  const route = useRoute()
  const genre = route.query.genre;
  const movies = ref([]);
  const count = 10;
  const currentPage = ref(1);
  const hasMore = ref(true);

  const renderNameGenre = computed(() => {
    return genresInfo.find(item => item.systemName === genre)?.renderName;
  });

  const getMovies = async () => {
    await axios.get(`https://cinemaguide.skillbox.cc/movie?genre=${genre}&count=${count}&page=${currentPage.value}`)
      .then(response => {
        if (response.data.length < count) {
          hasMore.value = false;
        }

        const sortedMovies = response.data.sort((a, b) => b.tmdbRating - a.tmdbRating);
        movies.value.push(...sortedMovies);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const loadMore = () => {
    if (hasMore.value) {
      currentPage.value++;
      getMovies();
    }
  }

  onMounted(getMovies);
</script>

<template>
  <section class="genre">
    <Container>
      <div class="genre__wrapper">
        <router-link class="genre__title" tag="h2" to="/movie">
          <IconPrevArrow class="genre__title-icon" />
          <span class="genre__title-text">{{ renderNameGenre }}</span>
        </router-link>

        <FilmList :films="movies" :is-genre="true"/>

        <TheButton class="genre__btn" v-if="hasMore" @click="loadMore">Показать ещё</TheButton>
      </div>
    </Container>
  </section>
</template>
