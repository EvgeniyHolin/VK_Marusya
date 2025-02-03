import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthModalStore = defineStore('AuthModal', () => {
  const isVisible = ref(false);

  const openModal = () => {
    isVisible.value = true;
  };

  const closeModal = () => {
    isVisible.value = false;
  };

  return { isVisible, openModal, closeModal }
})
