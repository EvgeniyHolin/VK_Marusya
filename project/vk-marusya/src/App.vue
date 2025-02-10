<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import TheHeader from './components/TheHeader.vue';
  import AuthModal from './components/AuthModal.vue';
  import { useAuthModalStore } from '@/stores/AuthModal';
  import TheFooter from './components/TheFooter.vue';

  const authModal = useAuthModalStore();
</script>

<template>
  <div :class="!authModal.isVisible ? 'app-wrapper' : 'app-wrapper app-wrapper--shadow'">
    <TheHeader />

    <transition name="fade">
      <AuthModal v-if="authModal.isVisible"/>
    </transition>

    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component"/>
      </transition>
    </router-view>

    <TheFooter />
  </div>
</template>
