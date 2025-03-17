<script lang="ts" setup>
  import IconStar from '@/assets/icons/icon-star.svg';
  import genresInfo from '@/data/genres-info';

  defineProps({
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
  });

  const formatRating = ( rating: string | undefined ): string => {
    if (rating) {
      return `${Number(rating).toFixed(1)}`
    }
    return '0';
  };

  const formatRuntime = ( time: string | undefined ): string => {
    if (time) {
      return `${Math.floor(+time / 60)} ч ${+time % 60} мин`;
    }
    return '0';
  }

  const formatGenre = (genres: Array<string> | undefined): string => {
    if (genres) {
      return genresInfo.find(item => item.systemName === genres[0])?.renderName;
    }
    return '';
  };
</script>

<template>
  <div class="film-info">
    <div class="film-info__rating">
      <IconStar class="film-info__rating-icon" />
      <span class="film-info__rating-num">{{ formatRating(rating) }}</span>
    </div>
    <span class="film-info__release">{{ release }}</span>
    <span class="film-info__genre">{{ formatGenre(genre) }}</span>
    <span class="film-info__runtime">{{ formatRuntime(runtime) }}</span>
  </div>
</template>
