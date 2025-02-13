<script lang="ts" setup>
  import Container from '@/components/TheContainer.vue';
  import { useAuthUserStore } from '@/stores/AuthUser';
  import axios from 'axios';
  import { RouterLink } from 'vue-router';

  const userAuth = useAuthUserStore();

  const exitProfile = async () => {
    await axios.get('https://cinemaguide.skillbox.cc/auth/logout')
      .then(response => {
        console.log('Статус выхода:', response.status);
        sessionStorage.clear();
        userAuth.isAuth = false;
      })
      .catch(error => {
        console.log(error);
      })
  };
</script>

<template>
  <section>
    <Container>
      <h1>Profile View</h1>
      <router-link tag="a" to="/" @click="exitProfile">Выход</router-link>
    </Container>
  </section>
</template>
