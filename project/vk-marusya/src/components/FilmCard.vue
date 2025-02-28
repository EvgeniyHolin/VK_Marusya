<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import IconFavorite from '@/assets/icons/icon-favorite.svg';
  import IconAddFavorite from '@/assets/icons/icon-add-favorite.svg';
  import IconReplace from '@/assets/icons/icon-replace.svg';
  import IconStar from '@/assets/icons/icon-star.svg';
  import ThePicture from './ThePicture.vue';
  import TheButton from './TheButton.vue';
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
    trailerUrl: {
      type: String
    }
  });

  const emit = defineEmits(['getNewFilm']);
  const userAuth = useAuthUserStore();
  const modal = useModalStore();
  const favoriteMovies = ref([]);
  const isFavorite = useIsFavoriteStore();
  const hero = ref(props.hero);

  const formatRating = ( rating: string | undefined ): string => {
    if (rating) {
      return `${Number(rating).toFixed(1)}`
    }
    return '';
  };

  const formatRuntime = ( time: string | undefined ): string => {
    if (time) {
      return `${Math.floor(+time / 60)} ч ${+time % 60} мин`;
    }
    return '';
  }

  const formatGenre = (genres: Array<string> | undefined): string => {
    if (genres) {
      return genres[0];
    }
    return '';
  };

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
      await axios.post('https://cinemaguide.skillbox.cc/favorites', {id: String(props.id)}, {withCredentials: true})
        .then(async () => {
          await getFavoriteMovies();

          if (!(props.id in favoriteMovies.value)) {
            isFavorite.isFavorite = true;
          }
        })
        .catch(async () => {
          await axios.delete(`https://cinemaguide.skillbox.cc/favorites/${props.id}`, { withCredentials: true })
          removeIsFavorite();
        })
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

  onMounted(getFavoriteMovies);
</script>

<template>
  <div class="film-card">
    <div class="film-card__wrapper">
      <div class="film-card__content">
        <div class="film-card__info">
          <div class="film-card__rating">
            <IconStar class="film-card__rating-icon" />
            <span class="film-card__rating-num">{{ formatRating(rating) }}</span>
          </div>
          <span class="film-card__release">{{ release }}</span>
          <span class="film-card__genre">{{ formatGenre(genre) }}</span>
          <span class="film-card__runtime">{{ formatRuntime(runtime) }}</span>
        </div>
        <h2 class="film-card__title">{{ title }}</h2>
        <p class="film-card__descr">{{ formatDescr(description) }}</p>
      </div>

      <div class="film-card__action">
        <TheButton class="film-card__btn" title="Трейлер" @click="openTrailer" />
        <router-link class="btn film-card__btn film-card__btn--grey" v-if="hero" :to="`movie/${id}`" tag="button">О&nbsp;фильме</router-link>
        <TheButton class="film-card__btn film-card__btn--grey film-card__btn--sm" id="favorite" @click="addFavorite()">
          <IconAddFavorite class="film-card__icon" v-if="isFavorite.isFavorite" />
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
              <div class="film-card__trailer">
                <video class="film-card__video" width="960" height="540" controls>
                  <source :src="trailerUrl" type="video/mp4">
                </video>
              </div>
            </template>
          </the-modal>
    </transition>

  </div>
</template>
