<script lang="ts" setup>
  import MainNav from './MainNav.vue';
  import TheContainer from './TheContainer.vue';
  import MainLogo from '@/assets/icons/main-logo.svg';
  import { RouterLink } from 'vue-router';
  import mainNavItems from '@/data/main-nav';
  import type NavLink from '@/types/NavLinkType';
  import { useAuthModalStore } from '@/stores/AuthModal';
  import { useAuthUserStore } from '@/stores/AuthUser';
  import { onMounted } from 'vue';
  import getSessionData from '@/scripts/getSessionData';

  const authModal = useAuthModalStore();
  const userAuth = useAuthUserStore()

  const homePage: NavLink = mainNavItems.filter(el => el.name === 'home')[0];

  const openModal = () => {
    authModal.openModal();
  };

  const getUserData = () => {
    const data = getSessionData()
    if (data) {
      userAuth.data = data;
      userAuth.isAuth = true;
    }
  }

  onMounted(() => {
    getUserData();
  });
</script>

<template>
  <header class="header">
    <TheContainer>
      <div class="header__wrapper">
        <router-link class="header__logo-link" tag="a" :to="homePage.path">
          <MainLogo class="header__logo-icon" />
        </router-link>

        <MainNav />

        <router-link v-if="userAuth.isAuth" class="header__btn" tag="a" to="/profile" active-class="active-link">
          {{ userAuth.data.name }}
        </router-link>
        <button v-else class="header__btn" type="button" @click="openModal">Войти</button>
      </div>
    </TheContainer>
  </header>
</template>
