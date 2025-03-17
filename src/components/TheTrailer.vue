<script lang="ts" setup>
  import { computed } from 'vue';

  const props = defineProps({
    trailerId: {
      type: String
    }
  })

  const trailerUrl = computed(() => {
    return `https://www.youtube.com/embed/${props.trailerId}`;
  });
</script>

<template>
  <div class="trailer">
    <iframe class="trailer__video" :src="trailerUrl" width="960" height="540" allowfullscreen></iframe>
  </div>
</template>
