import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthUserStore = defineStore('AuthUser', () => {
  const isAuth = ref(false);
  const data = ref({
    email: '',
    favorites: [],
    name: '',
    surname: ''
  })


  return { isAuth, data }
})
