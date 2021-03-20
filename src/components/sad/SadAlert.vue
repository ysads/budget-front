<template>
  <div class="sad-alert">
    <div
      class="sad-alert__ribbon"
      :class="`sad-alert__ribbon-${variant}`"
      data-test="ribbon"
    />
    <sad-icon
      class="sad-alert__icon"
      :name="variantIcon"
      :color="variantColor"
      size="medium"
      data-test="variant-icon"
    />
    <span class="sad-alert__message" data-test="message">
      {{ message }}
    </span>
    <button
      class="sad-alert__close"
      data-test="close-icon"
      @click="emit('close', id)"
      @keydown.enter="emit('close', id)"
    >
      <sad-icon color="info" name="times" />
    </button>
  </div>
</template>

<script>
import SadIcon from './SadIcon'
import { computed, defineComponent, onMounted } from '@vue/composition-api'

const VARIANTS = {
  error: {
    icon: 'exclamation-circle',
    color: 'red',
  },
  success: {
    icon: 'check-circle',
    color: 'green',
  },
  warning: {
    icon: 'exclamation-triangle',
    color: 'yellow',
  },
}

export default defineComponent({
  name: 'SadAlert',
  components: {
    SadIcon,
  },
  props: {
    duration: {
      type: Number,
      default: 4000,
    },
    id: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    variant: {
      type: String,
      required: true,
      validator (val) {
        return Object.keys(VARIANTS).includes(val)
      },
    },
  },
  setup (props, { emit }) {
    const variantColor = computed(() => VARIANTS[props.variant].color)
    const variantIcon = computed(() => VARIANTS[props.variant].icon)

    onMounted(() => {
      if (props.duration === 0) return
      setTimeout(() => emit('close', props.id), props.duration)
    })

    return { emit, variantColor, variantIcon }
  },
})
</script>

<style lang="scss" scoped>
.sad-alert {
  background: var(--app-bg);
  border-radius: var(--radius-4);
  box-shadow: var(--shadow-12);
  color: var(--text-default);
  display: flex;
  overflow: hidden;
  width: 350px;

  &__ribbon {
    width: 4px;
    flex-shrink: 0;
  }
  &__ribbon-error { background: var(--color-error); }
  &__ribbon-success { background: var(--color-success); }
  &__ribbon-warning { background: var(--color-warning); }
  &__icon {
    align-self: center;
    flex-shrink: 0;
    padding-left: 16px;
  }
  &__close {
    background: none;
    border: 0;
    cursor: pointer;
    align-self: center;
    margin-right: 16px;
  }
  &__message {
    padding: 16px;
    flex-grow: 1;
  }
}
</style>
