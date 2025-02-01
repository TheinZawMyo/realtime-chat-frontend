<template>
  <div class="container m-auto bg-gray-100">
    <NavBar v-if="showNavBar" />
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const showNavBar = computed(() => {
  return !['/messages'].includes(route.path);
});
</script>