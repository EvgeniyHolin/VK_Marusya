<script lang="ts" setup>
  import { ref } from 'vue';
  import CustomInput from './CustomInput.vue';
  import TheButton from './TheButton.vue';
  import type InputType from '@/types/InputType';
  import axios from 'axios';
  import { useFormDataStorage } from '@/stores/FormData';
  import { email, required } from '@vuelidate/validators';
  import removeAllErrorClass from '@/scripts/removeAllErrorClass';
  import validate from '@/scripts/validate';
  import { useAuthUserStore } from '@/stores/AuthUser';
  import getSessionData from '@/scripts/getSessionData';
  import { useRouter } from 'vue-router';

  defineProps({
    fields: {
      type: Array<InputType>
    },
    buttonTitle: String,
    isRegistration: Boolean
  });

  const emit = defineEmits(['form-submitted']);

  const formData = useFormDataStorage();
  const userAuth = useAuthUserStore();
  const router = useRouter();
  const matchPassword = ref(true);
  const userExist = ref(false);
  const errorData = ref(false);

  const addValue = (fieldName: string, value: string): void => {
    formData[fieldName] = value
  }

  const openUserSession = async () => {
    await axios.get('https://cinemaguide.skillbox.cc/profile', { withCredentials: true })
      .then(response => {
        sessionStorage.setItem('authUserData', JSON.stringify(response.data));
        userAuth.data = getSessionData();
        userAuth.isAuth = true;

        setTimeout(() => { // закрытие сессии через 12 часов
          sessionStorage.clear();
          userAuth.data = {
            email: '',
            favorites: [],
            name: '',
            surname: ''
          };
          userAuth.isAuth = false;
          router.push('/auth/logout');
          router.push('/');
        }, 43200000);
      })
      .catch(error => {
        console.error('Ошибка при получении данных', error)
      });
  };

  const registerUser = async () => {
    const data = ref({
      email: formData.email,
      name: formData.name,
      surname: formData.surname,
      password: formData.password,
      repeatPassword: formData.repeatPassword
    });

    const rules = {
      data: {
        email: { required, email },
        name: { required },
        surname: { required },
        password: { required },
        repeatPassword: { required }
      }
    };

    if (validate(data, rules)) {
      if (formData.repeatPassword !== formData.password) {
        matchPassword.value = false;
        removeAllErrorClass();
      } else {
        matchPassword.value = true;
        removeAllErrorClass();
        await axios.post('https://cinemaguide.skillbox.cc/user', {
          email: formData.email,
          password: formData.password,
          name: formData.name,
          surname: formData.surname
        }).then(() => {
          userExist.value = false
          handleSubmit();
          formData.cleanFormData();
        }).catch(error => {
          if (error.status === 409) {
            userExist.value = true
          }
        });
      }
    }
  };

  const authUser = async () => {
    const data = ref({
      email: formData.email,
      password: formData.password
    });

    const rules = {
      data: {
        email: { required, email },
        password: { required },
      }
    };

    if (validate(data, rules)) {
      await axios.post('https://cinemaguide.skillbox.cc/auth/login', {
        email: formData.email,
        password: formData.password
      }, { withCredentials: true }).then(() => {
          openUserSession();
          errorData.value = false;
          handleSubmit();
          removeAllErrorClass();
          formData.cleanFormData();
        })
        .catch(() => {
          errorData.value = true;
        });
    }
  };

  const handleSubmit = () => {
    emit('form-submitted', true)
  };
</script>

<template>
  <form class="user-form" method="post" @submit.prevent="isRegistration ? registerUser() : authUser()">
    <CustomInput v-for="field in fields" :key="field.id"
      class="user-form__wrapper"
      input-class="user-form__input"
      icon-class="user-form__input-icon"
      :type-val="field.type"
      :placeholder="field.placeholder"
      :filed-name="field.name"
      @get-value="addValue"
    >
      <template v-slot:icon>
        <component class="user-form__icon" :is="field.icon"/>
      </template>
    </CustomInput>

    <span class="user-form__error" v-if="!matchPassword">Пароли должны совпадать</span>
    <span class="user-form__error" v-if="userExist">Пользователь с такой почтой уже существует</span>
    <span class="user-form__error" v-if="errorData">Неверные данные для входа</span>

    <TheButton class="user-form__submit" type="submit" :title="buttonTitle" />
  </form>
</template>
