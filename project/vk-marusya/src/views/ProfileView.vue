<script lang="ts" setup>
  import Container from '@/components/TheContainer.vue';
  import { RouterLink } from 'vue-router';
  import IconFavorite from '@/assets/icons/icon-favorite.svg';
  import IconPerson from '@/assets/icons/icon-person.svg';
</script>

<template>
  <section class="profile">
    <Container>
      <h2 class="profile__title">Мой аккаунт</h2>

      <div class="profile__intaraction">
        <router-link class="profile__link" tag="a" to="/profile/favorites" active-class="active-link">
          <IconFavorite class="profile__link-icon" />
          <span class="profile__link-text">Избранные фильмы</span>
        </router-link>
        <router-link class="profile__link" tag="a" to="/profile/info" active-class="active-link">
          <IconPerson class="profile__link-icon" />
          <span class="profile__link-text">Настройка аккаунта</span>
        </router-link>
      </div>

      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component"/>
        </transition>
      </router-view>

    </Container>
  </section>
</template>
