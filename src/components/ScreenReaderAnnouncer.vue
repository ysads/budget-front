<template>
  <div class="screen-reader-announcer" aria-live="polite">
    {{ message }}
  </div>
</template>

<script lang="ts">
import { eventBus, Events } from '@/events';
import { defineComponent, ref } from 'vue';

type AnnouncePayload = {
  message: string;
};

const ANNOUNCEMENT_DURATION = 5000;

export default defineComponent({
  setup() {
    const message = ref('');

    eventBus.on(Events.ANNOUNCE, (payload?: AnnouncePayload) => {
      message.value = payload?.message || '';

      // INFO: auto-remove announcements after a while so that users
      // don't accidentally keep reading them.
      setTimeout(() => (message.value = ''), ANNOUNCEMENT_DURATION);
    });

    return { message };
  },
});
</script>

<style scoped>
.screen-reader-announcer {
  height: 1px;
  left: -9999px;
  overflow: hidden;
  position: absolute;
  top: -9999px;
  white-space: nowrap;
  width: 1px;
}
</style>
