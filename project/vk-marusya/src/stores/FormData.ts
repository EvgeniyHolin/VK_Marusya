import { ref } from 'vue';
import { defineStore } from 'pinia';


export const useFormDataStorage = defineStore('RegFormData', () => {
  const email = ref('');
  const name = ref('');
  const surname = ref('');
  const password = ref('');
  const repeatPassword = ref('');

  const cleanFormData = (): void => {
    email.value = '';
    name.value = '';
    surname.value = '';
    password.value = '';
    repeatPassword.value = '';
  };

  return {
    email,
    name,
    surname,
    password,
    repeatPassword,
    cleanFormData
  }
})
