<script lang="ts" setup>
  import MainLogoInvert from '@/assets/icons/main-logo-invert.svg';
  import Form from '@/components/TheForm.vue';
  import TheButton from './TheButton.vue';
  import authInputs from '@/data/auth-inputs';
  import regInputs from '@/data/reg-inputs';
  import { useAuthModalStore } from '@/stores/AuthModal';
  import { useFormDataStorage } from '@/stores/FormData';
  import { ref } from 'vue';

  const authModal = useAuthModalStore();
  const formData = useFormDataStorage();
  const isRegistration = ref(false);
  const isSuccessfully = ref(false);

  const closeModal = (): void => {
    authModal.closeModal();
    formData.cleanFormData();
    isRegistration.value = false;
  };

  const toggleIsRegistration = (): void => {
    formData.cleanFormData()
    isRegistration.value = !isRegistration.value;
  };

  const toggleIsSuccessfully = (): void => {
    isSuccessfully.value = !isSuccessfully.value;
  };

  const addSuccessfully = (value: boolean): void => {
    isSuccessfully.value = value;
  }

  const addLogin = (value: boolean): void => {
    authModal.isVisible = !value;
  }
</script>

<template>
  <div class="modal">
    <button class="modal__close" type="button" @click="closeModal">
      <span class="modal__close-line"></span>
    </button>

    <MainLogoInvert class="modal__logo" />

    <div v-if="isSuccessfully" class="modal__successfully">
      <h2 class="modal__title">Регистрация завершена</h2>
      <p class="modal__text">Используйте вашу электронную почту для входа</p>
      <TheButton class="modal__btn modal__btn--successfuly"
        type="button" :title="'Войти'"
        @click="toggleIsRegistration(), toggleIsSuccessfully()"
      />
    </div>

    <div v-else class="modal__form">
      <h2 v-if="isRegistration" class="modal__title">Регистрация</h2>

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

      <button class="modal__btn" type="button" @click="toggleIsRegistration">
        {{ isRegistration ? 'У меня есть пароль' : 'Регистрация' }}
      </button>
    </div>
  </div>
</template>

