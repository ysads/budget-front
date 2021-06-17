<template>
  <div id="app">
    <alert-container />
    <router-view />
  </div>
</template>

<script lang="ts">
import AlertContainer from '@/components/AlertContainer.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    AlertContainer,
  },
});
</script>
