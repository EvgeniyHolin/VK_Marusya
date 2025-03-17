<script lang="ts" setup>
  import mainNavItems from '../data/main-nav';
  import { RouterLink } from 'vue-router';
  import CustomInput from './CustomInput.vue';
  import SearchList from './SearchList.vue';
  import IconSearch from '@/assets/icons/icon-search.svg';
  import IconGenres from '@/assets/icons/icon-genres.svg';
  import { ref } from 'vue';
  import axios from 'axios';
  import { useFormDataStorage } from '@/stores/FormData';
  import { useModalStore } from '@/stores/TheModal';

  const foundMovies = ref([]);
  const searchIsNotEmpty = ref(false);
  const formData = useFormDataStorage();
  const modal = useModalStore();

  const addSearchModal = async (fieldName: string, value: string): Promise<void> => {
    if (value !== "" && fieldName === 'search') {
      searchIsNotEmpty.value = true;
      formData.search = value;
      await axios.get(`https://cinemaguide.skillbox.cc/movie?title=${value}`)
        .then(response => {
          foundMovies.value = response.data;
        })
        .catch(error => {
          console.log(error);
        })
    } else {
      searchIsNotEmpty.value = false;
      formData.search = "";
    }
  }

  const removeFilmsList = (): void => {
    searchIsNotEmpty.value = false;
    formData.search = "";
  };

  const openSearchField = async (): void => {
    modal.openMobileSearch();
    const searchInput = document.querySelector('.custom-input--search');
    if (searchInput) {
      searchInput.classList.add('search-active');

      const handleClickOutside = (event) => {
        if (!searchInput.contains(event.target)) {
          searchInput.classList.remove('search-active');
          modal.closeMobileSearch();
          removeFilmsList();
          document.removeEventListener('click', handleClickOutside);
        }
      };

      setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
      }, 1)
    }
  };
</script>

<template>
  <div class="main-nav">
    <ul class="main-nav__list">
      <li class="main-nav__item" v-for="link in mainNavItems" :key="link.id">
        <router-link class="main-nav__link" tag="a" :to="link.path" active-class="active-link">{{ link.title }}</router-link>
      </li>
    </ul>

    <router-link class="main-nav__link main-nav__link--mobile" tag="a" to="/movie" active-class="active-link">
      <IconGenres/>
    </router-link>

    <div class="main-nav__search">
      <CustomInput
        class="custom-input--search"
        type-val="text"
        placeholder="Поиск"
        input-class="custom-input__input--search"
        filed-name="search"
        @get-value="addSearchModal"
        @hidden-list="removeFilmsList"
      >
        <template v-slot:icon>
          <IconSearch />
        </template>
      </CustomInput>

      <button class="main-nav__search-btn" @click="openSearchField">
        <IconSearch />
      </button>

      <SearchList v-if="searchIsNotEmpty" :movies="foundMovies" @hidden-search-list="removeFilmsList"/>
    </div>
  </div>
</template>
