<script lang="ts" setup>
  import { ref } from 'vue';
  import IconFavorite from '@/assets/icons/icon-favorite.svg';
  import IconReplace from '@/assets/icons/icon-replace.svg';
  import IconStar from '@/assets/icons/icon-star.svg';
  import ThePicture from './ThePicture.vue';
  import TheButton from './TheButton.vue';
  import { useAuthUserStore } from '@/stores/AuthUser';
  import { useAuthModalStore } from '@/stores/AuthModal';
  import axios from 'axios';

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
      type: String
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
    }
  });

  const emit = defineEmits(['getNewFilm']);
  const userAuth = useAuthUserStore();
  const authModal = useAuthModalStore();

  const getNewFilm = () => {
    emit('getNewFilm');
  };

  const hero = ref(props.hero);

  const addFavorite = async () => {
    if (userAuth.isAuth) {
      console.log('Логика добавления фильма в избранное');
    } else {
      authModal.openModal();
    }
  };
</script>

<template>
  <div class="film-card">
    <div class="film-card__wrapper">
      <div class="film-card__content">
        <div class="film-card__info">
          <div class="film-card__rating">
            <IconStar class="film-card__rating-icon" />
            <span class="film-card__rating-num">{{ rating }}</span>
          </div>
          <span class="film-card__release">{{ release }}</span>
          <span class="film-card__genre">{{ genre }}</span>
          <span class="film-card__runtime">{{ runtime }}</span>
        </div>
        <h2 class="film-card__title">{{ title }}</h2>
        <p class="film-card__descr">{{ description }}</p>
      </div>

      <div class="film-card__action">
        <TheButton class="film-card__btn" :title="'Трейлер'" />
        <TheButton class="film-card__btn film-card__btn--grey" :title="'О фильме'" v-if="hero" />
        <TheButton class="film-card__btn film-card__btn--grey film-card__btn--sm" @click="addFavorite()">
          <IconFavorite class="film-card__icon" />
        </TheButton>
        <TheButton class="film-card__btn film-card__btn--grey film-card__btn--sm" v-if="hero" @click="getNewFilm">
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
  </div>
</template>
