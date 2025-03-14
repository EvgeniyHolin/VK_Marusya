<script lang="ts" setup>
  import Container from '@/components/TheContainer.vue';
  import { RouterLink } from 'vue-router';
  import IconFavorite from '@/assets/icons/icon-favorite.svg';
  import IconPerson from '@/assets/icons/icon-person.svg';
  import { ref, onMounted, onUnmounted } from 'vue';

  const vaforiteFilmsText = ref('Избранные фильмы');
  const accauntText = ref('Настройка аккаунта');

  const handleText = () => {
    if (window.innerWidth < 768) {
      vaforiteFilmsText.value = 'Избранное';
      accauntText.value = 'Настройки'
    } else {
      vaforiteFilmsText.value = 'Избранные фильмы';
      accauntText.value = 'Настройка аккаунта';
    }
  };

  onMounted(() => {
    handleText();
    window.addEventListener('resize', handleText);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', handleText);
  });
</script>

<template>
  <section class="profile">
    <Container>
      <h2 class="profile__title">Мой аккаунт</h2>

      <div class="profile__intaraction">
        <router-link class="profile__link" tag="a" to="/profile/favorites" active-class="active-link">
          <IconFavorite class="profile__link-icon" />
          <span class="profile__link-text">{{ vaforiteFilmsText }}</span>
        </router-link>
        <router-link class="profile__link" tag="a" to="/profile/info" active-class="active-link">
          <IconPerson class="profile__link-icon" />
          <span class="profile__link-text">{{ accauntText }}</span>
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
