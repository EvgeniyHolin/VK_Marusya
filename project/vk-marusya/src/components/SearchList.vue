<script lang="ts" setup>
  import { ref, computed, onMounted } from 'vue';
  import { RouterLink } from 'vue-router';
  import ThePicture from './ThePicture.vue';
  import FilmInfo from './FilmInfo.vue';

  const props = defineProps({
    movies: {
      type: Array
    }
  });

  const emit = defineEmits(['hiddenSearchList'])

  const topFiveFilms = computed(() => {
    if (props.movies) {
      return props.movies.slice(0, 5);
    } else {
      return []
    }
  });

  const redirectToMovie = () => {
    emit('hiddenSearchList');
  }
</script>

<template>
    <ul class="search-list" v-if="topFiveFilms.length > 0">
      <li class="search-list__item" v-for="movie in topFiveFilms" :key="movie.id">
        <router-link class="search-list__link" tag="a" :to="`/movie/${movie.id}`" @click="redirectToMovie">
          <ThePicture
            class="search-list__pict"
            :img-path="movie.posterUrl"
            alt-text="Постер фильма"
            class-name="search-list__img"
          />
          <div class="search-list__wrapper">
            <FilmInfo
              class="film-info--search"
              :rating="movie.tmdbRating"
              :release="movie.releaseYear"
              :genre="movie.genres"
              :runtime="movie.runtime"
            />
            <h3 class="search-list__title">{{ movie.title }}</h3>
          </div>
        </router-link>
      </li>
    </ul>
    <span class="search-list__empty" v-else>По вашему запросу ничего не найдено</span>
</template>
