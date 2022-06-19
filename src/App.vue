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
import { defineComponent, onMounted, onUnmounted, watch } from 'vue';
import { eventBus, Events } from '@/events';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  components: {
    AlertContainer,
    ScreenReaderAnnouncer,
  },
  setup() {
    const { locale } = useI18n();

    watch(locale, () => {
      const rootTag = document.querySelector('html');

      if (rootTag) {
        rootTag.lang = locale.value;
      }
    });

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
