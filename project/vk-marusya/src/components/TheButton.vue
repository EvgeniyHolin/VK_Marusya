<script lang="ts" setup>
  const props = defineProps({
    title: {
      type: String
    }
  })
</script>

<template>
  <button class="btn">{{ props.title }}</button>
</template>
