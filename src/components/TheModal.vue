<script lang="ts" setup>
  import MainLogoInvert from '@/assets/icons/main-logo-invert.svg';
  import Form from '@/components/TheForm.vue';
  import TheButton from './TheButton.vue';
  import authInputs from '@/data/auth-inputs';
  import regInputs from '@/data/reg-inputs';
  import { useModalStore } from '@/stores/TheModal';
  import { useFormDataStorage } from '@/stores/FormData';
  import { ref } from 'vue';

  const modal = useModalStore();
  const formData = useFormDataStorage();
  const isRegistration = ref(false);
  const isSuccessfully = ref(false);

  const closeModal = (): void => {
    modal.closeAuthModal();
    modal.closeTrailerModal();
    formData.cleanFormData();
    isRegistration.value = false;
  };

  const toggleIsRegistration = (): void => {
    formData.cleanFormData()
    isRegistration.value = !isRegistration.value;
  };

  const addSuccessfully = (value: boolean): void => {
    isSuccessfully.value = value;
  }

  const addLogin = (): void => {
    modal.closeAuthModal();
  }
</script>

<template>
  <div class="modal">
    <the-button class="modal__close" type="button" @click="closeModal">
      <span class="modal__close-line"></span>
    </the-button>

    <div class="trailer-modal" v-if="modal.isTrailer">
      <slot name="trailer"></slot>
    </div>

    <div class="auth-modal" v-if="modal.isAuth">
      <MainLogoInvert class="auth-modal__logo" />

      <div v-if="isSuccessfully" class="auth-modal__successfully">
        <h2 class="auth-modal__title">Регистрация завершена</h2>
        <p class="auth-modal__text">Используйте вашу электронную почту для входа</p>
        <TheButton class="auth-modal__btn auth-modal__btn--successfuly"
          type="button" :title="'Войти'"
          @click="toggleIsRegistration(), addSuccessfully(false)"
        />
      </div>

      <div v-else class="auth-modal__form">
        <h2 v-if="isRegistration" class="auth-modal__title">Регистрация</h2>

        <Form v-if="isRegistration"
          :fields="regInputs"
          buttonTitle="Создать аккаунт"
          isRegistration
          @form-submitted="addSuccessfully"
        />
        <Form v-else
          :fields="authInputs"
          buttonTitle="Войти"
          @form-submitted="addLogin"
        />

        <button class="auth-modal__btn" type="button" @click="toggleIsRegistration">
          {{ isRegistration ? 'У меня есть пароль' : 'Регистрация' }}
        </button>
      </div>
    </div>
  </div>
</template>

