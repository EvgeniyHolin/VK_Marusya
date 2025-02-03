import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthUserStore = defineStore('AuthUser', () => {
  const isAuth = ref(false);
  const userData = ref({
    email: '',
    favorites: [],
    name: '',
    surname: ''
  });

  const toggleAuth = () => {
    isAuth.value = !isAuth.value;
  };

  return { isAuth, userData, toggleAuth }
})
