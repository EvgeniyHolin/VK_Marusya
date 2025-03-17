import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useIsFavoriteStore = defineStore('IsFavorite', () => {
  const isFavorite = ref(false);

  return { isFavorite }
})
