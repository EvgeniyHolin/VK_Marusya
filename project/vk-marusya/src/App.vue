<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import TheHeader from './components/TheHeader.vue';
  import Modal from './components/TheModal.vue';
  import { useModalStore } from '@/stores/TheModal';
  import TheFooter from './components/TheFooter.vue';

  const modal = useModalStore();
</script>

<template>
  <div :class="!(modal.isAuth || modal.isTrailer) ? 'app-wrapper' : 'app-wrapper app-wrapper--shadow'">
    <TheHeader />

    <transition name="fade">
      <Modal v-if="modal.isAuth"/>
    </transition>

    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component"/>
      </transition>
    </router-view>

    <TheFooter />
  </div>
</template>
