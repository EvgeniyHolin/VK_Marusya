<script lang="ts" setup>
  import mainNavItems from '../data/main-nav';
  import { RouterLink } from 'vue-router';
  import CustomInput from './CustomInput.vue';
  import IconSearch from '@/assets/icons/icon-search.svg';

  const placeholder = 'Поиск';
  const typeInput = 'text';
</script>

<template>
  <div class="main-nav">
    <ul class="main-nav__list">
      <li class="main-nav__item" v-for="link in mainNavItems" :key="link.id">
        <router-link class="main-nav__link" tag="a" :to="link.path">{{ link.title }}</router-link>
      </li>
    </ul>

    <CustomInput :type-val="typeInput" :placeholder="placeholder">
      <template v-slot:icon>
        <IconSearch />
      </template>
    </CustomInput>
  </div>
</template>
