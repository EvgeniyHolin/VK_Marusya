<script lang="ts" setup>
  defineProps({
    title: {
      type: String
    }
  })
</script>

<template>
  <button class="btn">
    {{ title }}
    <slot />
  </button>
</template>
