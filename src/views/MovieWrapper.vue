<script lang="ts" setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import GenreView from './GenreView.vue';
  import AllGenresView from './AllGenresView.vue';

  const route = useRoute();

  const currentComponent = computed(() => {
    return route.query.genre ? GenreView : AllGenresView
  })
</script>

<template>
  <transition name="fade" mode="out-in">
    <component :is="currentComponent" />
  </transition>
</template>
