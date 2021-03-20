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

<script>
import { eventBus, SHOW_ALERT } from '@/events'
import SadAlert from '@/components/sad/SadAlert'
import uuid from 'uuid-random'
import { defineComponent, onMounted, ref } from '@vue/composition-api'

export default defineComponent({
  components: {
    SadAlert,
  },
  setup () {
    const alerts = ref([])
    const destroy = (id) => {
      alerts.value = alerts.value.filter(alert => alert.id !== id)
    }
    onMounted(() => {
      eventBus.on(SHOW_ALERT, (alert) => {
        alerts.value.push({ ...alert, id: uuid() })
      })
    })

    return { alerts, destroy }
  },
})
</script>

<style lang="scss" scoped>
.alert-container {
  bottom: 20px;
  left: calc(50% - 200px);
  position: fixed;
  z-index: 99999;

  &__item {
    &:not(:first-of-type) {
      @include margin(top, 2);
    }
  }
}

.list-enter-active, .list-leave-active {
  transition: all 0.3s;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
