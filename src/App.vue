<template>
  <div id="app">
    <alert-container />
    <screen-reader-announcer />
    <router-view />
  </div>
</template>

<script lang="ts">
import AlertContainer from '@/components/AlertContainer.vue';
import ScreenReaderAnnouncer from '@/components/ScreenReaderAnnouncer.vue';
import { defineComponent, onMounted, onUnmounted } from 'vue';
import { eventBus, Events } from '@/events';

export default defineComponent({
  components: {
    AlertContainer,
    ScreenReaderAnnouncer,
  },
  setup() {
    const handleGlobalEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        eventBus.emit(Events.CLOSE_DRAWER);
      }
    };

    onMounted(() => {
      window.addEventListener('keydown', handleGlobalEscape);
    });
    onUnmounted(() => {
      window.removeEventListener('keydown', handleGlobalEscape);
    });
  },
});
</script>
