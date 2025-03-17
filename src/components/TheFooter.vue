<script lang="ts" setup>
  import Container from './TheContainer.vue';
  import footerInfo from '@/data/footer-info';
</script>

<template>
  <footer class="footer">
    <Container>
      <div class="footer__wrapper">
        <ul class="footer__list">
          <li class="footer__item" v-for="link in footerInfo" :key="link.id">
            <a class="footer__link" :href="link.link" target="_blank" >
              <component class="footer__link-icon" :is="link.icon"/>
            </a>
          </li>
        </ul>
      </div>
    </Container>
  </footer>
</template>
