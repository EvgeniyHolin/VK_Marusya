<script lang="ts" setup>
  import MainNav from './MainNav.vue';
  import TheContainer from './TheContainer.vue';
  import MainLogo from '@/assets/icons/main-logo.svg';
  import { RouterLink } from 'vue-router';
  import mainNavItems from '@/data/main-nav/main-nav';
  import type NavLink from '@/types/NavLink';

  const homePage: NavLink = mainNavItems.filter(el => el.name === 'home')[0];
</script>

<template>
  <header class="header">
    <TheContainer>
      <div class="header__wrapper">
        <router-link class="header__logo-link" tag="a" :to="homePage.path">
          <MainLogo class="header__logo-icon" />
        </router-link>

        <MainNav />

        <a class="header__link" href="#">Войти</a>
      </div>
    </TheContainer>
  </header>
</template>
