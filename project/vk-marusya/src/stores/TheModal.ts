import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useModalStore = defineStore('Modal', () => {
  const isAuth = ref(false);
  const isTrailer = ref(false);
  const isModileSearch = ref(false);
  const body = document.querySelector('body');

  const openAuthModal = (): void => {
    isAuth.value = true;
    if(body) {
      body.style.overflow = 'hidden';
    }
  };

  const closeAuthModal = (): void => {
    isAuth.value = false;
    if(body) {
      body.style.overflow = 'visible';
    }
  };

  const openTrailerModal = (): void => {
    isTrailer.value = true;
    if(body) {
      body.style.overflow = 'hidden';
    }
  };

  const closeTrailerModal = (): void => {
    isTrailer.value = false;
    if(body) {
      body.style.overflow = 'visible';
    }
  };

  const openMobileSearch = (): void => {
    isModileSearch.value = true;
    if(body) {
      body.style.overflow = 'hidden';
    }
  };

  const closeMobileSearch = (): void => {
    isModileSearch.value = false;
    if(body) {
      body.style.overflow = 'visible';
    }
  };

  return {
    isAuth,
    isTrailer,
    isModileSearch,
    openAuthModal,
    closeAuthModal,
    openTrailerModal,
    closeTrailerModal,
    openMobileSearch,
    closeMobileSearch
  }
})
