<script lang="ts" setup>
  import { useAuthUserStore } from '@/stores/AuthUser';
  import { useIsFavoriteStore } from '@/stores/IsFavorite';
  import axios from 'axios';
  import { computed, onMounted, ref } from 'vue';
  import IconMail from '@/assets/icons/icon-mail.svg'

  const userAuth = useAuthUserStore();
  const isFavorite = useIsFavoriteStore();
  const userData = ref({
    surname: '',
    name: '',
    email: ''
  })

  const getData = async (): Promise<void> => {
    await axios.get('https://cinemaguide.skillbox.cc/profile', { withCredentials: true })
      .then(response => {
        userData.value = response.data
      })
      .catch(error => {
        console.log(error);
      })
  };

  const exitProfile = async (): Promise<void> => {
    await axios.get('https://cinemaguide.skillbox.cc/auth/logout')
      .then(() => {
        sessionStorage.clear();
        userAuth.isAuth = false;
        isFavorite.isFavorite = false;
      })
      .catch(error => {
        console.log(error);
      })
  };

  const getIconName = computed((): string => {
    const name = userData.value.name;
    const surname = userData.value.surname;
    return name.toUpperCase().charAt(0) + surname.toUpperCase().charAt(0)
  });

  onMounted(getData);
</script>

<template>
  <div class="profile-info">
    <div class="profile-info__content">
      <div class="profile-info__point">
        <span class="profile-info__icon">{{ getIconName }}</span>
        <div class="profile-info__text">
          <span class="profile-info__label">Имя Фамилия</span>
          <span class="profile-info__value">{{ userData.name }} {{ userData.surname }}</span>
        </div>
      </div>
      <div class="profile-info__point">
        <span class="profile-info__icon">
          <IconMail />
        </span>
        <div class="profile-info__text">
          <span class="profile-info__label">Электронная почта</span>
          <span class="profile-info__value">{{ userData.email }}</span>
        </div>
      </div>
    </div>
    <router-link class="btn profile-info__link" tag="a" to="/" @click="exitProfile">Выйти из&nbsp;аккаунта</router-link>
  </div>
</template>
