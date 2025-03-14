<script lang="ts" setup>
  import { onMounted, ref, watch } from 'vue';
  import IconFavorite from '@/assets/icons/icon-favorite.svg';
  import IconAddFavorite from '@/assets/icons/icon-add-favorite.svg';
  import IconReplace from '@/assets/icons/icon-replace.svg';
  import ThePicture from './ThePicture.vue';
  import TheButton from './TheButton.vue';
  import TheTrailer from './TheTrailer.vue';
  import FilmInfo from './FilmInfo.vue';
  import { useAuthUserStore } from '@/stores/AuthUser';
  import { useModalStore } from '@/stores/TheModal';
  import { useIsFavoriteStore } from '@/stores/IsFavorite';
  import axios from 'axios';
  import TheModal from './TheModal.vue';
  import { RouterLink } from 'vue-router';

  const props = defineProps({
    id: {
      type: String
    },
    rating: {
      type: String
    },
    release: {
      type: String
    },
    genre: {
      type: Array<string>
    },
    runtime: {
      type: String
    },
    title: {
      type: String
    },
    description: {
      type: String
    },
    hero: {
      type: Boolean
    },
    imagePath: {
      type: String
    },
    trailerYouTubeId: {
      type: String
    }
  });

  const emit = defineEmits(['getNewFilm']);
  const userAuth = useAuthUserStore();
  const modal = useModalStore();
  const favoriteMovies = ref([]);
  const isFavorite = useIsFavoriteStore();
  const hero = ref(props.hero);

  const formatDescr = (descr: string | undefined): string => {
    if (descr) {
      if (descr.length > 200) {
        return descr.slice(0, 200) + '...';
      };
      return descr;
    }
    return '';
  }

  const getNewFilm = () => {
    emit('getNewFilm');
  };

  const getFavoriteMovies = async (): Promise<void> => {
    if (userAuth.isAuth) {
      await axios.get('https://cinemaguide.skillbox.cc/favorites', { withCredentials: true })
        .then(response => {
          favoriteMovies.value = response.data;
        })
        .catch(error => {
          console.log(error);
        })
    }
  };

  const addFavorite = async (): Promise<void> => {
    if (userAuth.isAuth) {
      const movieExist = favoriteMovies.value.some(item => item.id === Number(props.id));
      if (movieExist) {
        await axios.delete(`https://cinemaguide.skillbox.cc/favorites/${props.id}`, { withCredentials: true })
        removeIsFavorite();
        getFavoriteMovies();
      } else {
        await axios.post('https://cinemaguide.skillbox.cc/favorites', {id: String(props.id)}, {withCredentials: true})
        .then(async () => {
          await getFavoriteMovies();

          if (!(props.id in favoriteMovies.value)) {
            isFavorite.isFavorite = true;
          }
        })
        .catch(error => {
          console.log(error);
        })
      }
    } else {
      modal.openAuthModal();
    }
  };

  const removeIsFavorite = (): void => {
    isFavorite.isFavorite = false;
  };

  const openTrailer = (): void => {
    modal.openTrailerModal();
  };

  watch(() => userAuth.isAuth, (newVal) => {
    getFavoriteMovies();
    if (newVal) {
      const movieExist = favoriteMovies.value.some(item => item.id === Number(props.id));
      if (movieExist) {
        isFavorite.isFavorite = true;
      }
    } else {
      isFavorite.isFavorite = false;
    }
  })

  onMounted(getFavoriteMovies);
</script>

<template>
  <div class="film-card">
    <div class="film-card__wrapper">
      <div class="film-card__content">
        <FilmInfo
          :rating="rating"
          :release="release"
          :genre="genre"
          :runtime="runtime"
        />
        <h2 class="film-card__title">{{ title }}</h2>
        <p class="film-card__descr" v-if="hero">{{ formatDescr(description) }}</p>
        <p class="film-card__descr" v-else>{{ description }}</p>
      </div>

      <div class="film-card__action">
        <TheButton class="film-card__btn film-card__btn--trailer" title="Трейлер" @click="openTrailer" />
        <router-link class="btn film-card__btn film-card__btn--about-film film-card__btn--grey" v-if="hero" :to="`movie/${id}`" tag="button">О&nbsp;фильме</router-link>
        <TheButton class="film-card__btn film-card__btn--grey film-card__btn--sm" id="favorite" @click="addFavorite()">
          <IconAddFavorite class="film-card__icon" v-if="isFavorite.isFavorite && userAuth.isAuth" />
          <IconFavorite class="film-card__icon" v-else />
        </TheButton>
        <TheButton class="film-card__btn film-card__btn--grey film-card__btn--sm" v-if="hero" @click="getNewFilm(), removeIsFavorite()">
          <IconReplace class="film-card__icon" />
        </TheButton>
      </div>
    </div>

    <div class="film-card__inner">
      <ThePicture
        class="film-card__pict"
        :img-path="imagePath"
        alt-text="Постер фильма"
        class-name="film-card__img"
      />
    </div>

    <transition name="fade" mode="out-in">
          <the-modal class="modal--trailer" v-if="modal.isTrailer">
            <template v-slot:trailer>
              <TheTrailer :trailerId="trailerYouTubeId" />
            </template>
          </the-modal>
    </transition>

  </div>
</template>
