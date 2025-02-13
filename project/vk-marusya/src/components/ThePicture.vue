<script lang="ts" setup>
  defineProps({
    imgPath: {
      type: String
    },
    altText: {
      type: String
    },
    mobileImgPath: {
      type: String
    },
    mediaWidth: {
      type: Number
    },
    className: {
      type: String
    }
  })
</script>

<template>
  <picture class="custom-image">
    <source :srcset="mobileImgPath" type="image/webp" :media="`(max-width: ${mediaWidth}px)`">
    <img class="custom-image__img" :class="className" :src="imgPath" :alt="altText">
  </picture>
</template>
