import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthModalStore = defineStore('AuthModal', () => {
  const isVisible = ref(false);
  const body = document.querySelector('body');

  const openModal = () => {
    isVisible.value = true;
    if(body) {
      body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    isVisible.value = false;
    if(body) {
      body.style.overflow = 'visible';
    }
  };

  return { isVisible, openModal, closeModal }
})
