<script lang="ts" setup>
  import mainNavItems from '../data/main-nav/main-nav';
  import { RouterLink } from 'vue-router';
  import TheCustomInput from './TheCustomInput.vue';
</script>

<template>
  <div class="main-nav">
    <ul class="main-nav__list">
      <li class="main-nav__item" v-for="link in mainNavItems" :key="link.id">
        <router-link class="main-nav__link" tag="a" :to="link.path">{{ link.title }}</router-link>
      </li>
    </ul>

    <TheCustomInput />
  </div>
</template>
