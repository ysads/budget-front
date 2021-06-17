<template>
  <div class="alert-container">
    <transition-group name="list" tag="p">
      <sad-alert
        v-for="alert in alerts"
        :id="alert.id"
        :key="alert.id"
        class="alert-container__item"
        :variant="alert.variant"
        :message="alert.message"
        data-test="alert"
        @close="destroy"
      />
    </transition-group>
  </div>
</template>

<script lang="ts">
import SadAlert from '@/components/sad/SadAlert.vue';
import uuid from 'uuid-random';
import { eventBus, Events } from '@/events';
import { defineComponent, onMounted, ref } from 'vue';

interface Alert {
  id: string;
  title: string | undefined;
  message: string;
}

export default defineComponent({
  components: {
    SadAlert,
  },
  setup() {
    const alerts = ref<Alert[]>([]);

    const destroy = (id: string) => {
      alerts.value = alerts.value.filter((alert) => alert.id !== id);
    };

    onMounted(() => {
      eventBus.on(Events.SHOW_ALERT, (alert) => {
        alerts.value.push({ ...alert, id: uuid() });
      });
    });

    return { alerts, destroy };
  },
});
</script>

<style lang="scss" scoped>
.alert-container {
  bottom: 20px;
  left: calc(50% - 200px);
  position: fixed;
  z-index: 99999;

  &__item {
    &:not(:first-of-type) {
      margin-top: $base * 2;
    }
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s;
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
