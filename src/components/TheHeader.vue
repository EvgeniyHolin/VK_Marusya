<script lang="ts" setup>
  import MainNav from './MainNav.vue';
  import TheContainer from './TheContainer.vue';
  import MainLogo from '@/assets/icons/main-logo.svg';
  import { RouterLink } from 'vue-router';
  import mainNavItems from '@/data/main-nav';
  import type NavLink from '@/types/NavLinkType';
  import { useModalStore } from '@/stores/TheModal';
  import { useAuthUserStore } from '@/stores/AuthUser';
  import { onMounted } from 'vue';
  import getSessionData from '@/scripts/getSessionData';
  import IconPerson from '@/assets/icons/icon-person.svg'

  const modal = useModalStore();
  const userAuth = useAuthUserStore()

  const homePage: NavLink = mainNavItems.filter(el => el.name === 'home')[0];

  const openModal = () => {
    modal.openAuthModal();
  };

  const getUserData = () => {
    const data = getSessionData()
    if (data) {
      userAuth.data = data;
      userAuth.isAuth = true;
    }
  }

  onMounted(getUserData);
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

        <router-link v-if="userAuth.isAuth" class="header__btn header__btn--mobile" tag="a" to="/profile" active-class="active-link">
          <IconPerson />
        </router-link>
        <button v-else class="header__btn header__btn--mobile" type="button" @click="openModal">
          <IconPerson />
        </button>
      </div>
    </TheContainer>
  </header>
</template>
