<script lang="ts" setup>
  import MainNav from './MainNav.vue';
  import TheContainer from './TheContainer.vue';
  import MainLogo from '@/assets/icons/main-logo.svg';
  import { RouterLink } from 'vue-router';
  import mainNavItems from '@/data/main-nav';
  import type NavLink from '@/types/NavLinkType';
  import { useAuthModalStore } from '@/stores/AuthModal';
  import { useAuthUserStore } from '@/stores/AuthUser';

  const authModal = useAuthModalStore();
  const user = useAuthUserStore();

  const homePage: NavLink = mainNavItems.filter(el => el.name === 'home')[0];

  const openModal = () => {
    authModal.openModal();
  };
</script>

<template>
  <header class="header">
    <TheContainer>
      <div class="header__wrapper">
        <router-link class="header__logo-link" tag="a" :to="homePage.path">
          <MainLogo class="header__logo-icon" />
        </router-link>

        <MainNav />

        <router-link v-if="user.isAuth" class="header__btn" tag="a" to="/profile">{{ user.userData.name }}</router-link>
        <button v-else class="header__btn" type="button" @click="openModal">Войти</button>
      </div>
    </TheContainer>
  </header>
</template>
