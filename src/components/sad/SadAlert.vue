<template>
  <div class="sad-alert" :class="classes" role="status">
    <div class="sad-alert__ribbon" data-test="ribbon" />
    <sad-icon
      class="sad-alert__icon"
      :name="variantIcon"
      size="medium"
      data-test="variant-icon"
    />
    <span class="sad-alert__message" data-test="message" role="status">
      {{ message }}
    </span>
    <button
      class="sad-alert__close"
      data-test="close-icon"
      @click="emit('close', id)"
      @keydown.enter="emit('close', id)"
    >
      <sad-icon name="times" />
    </button>
  </div>
</template>

<script lang="ts">
import SadIcon from './SadIcon.vue';
import { PropType, computed, defineComponent, onMounted } from 'vue';

const VARIANTS = {
  error: {
    icon: 'exclamation-circle',
  },
  success: {
    icon: 'check-circle',
  },
  warning: {
    icon: 'exclamation-triangle',
  },
};

type AlertVariant = 'error' | 'success' | 'warning';

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
      type: String as PropType<AlertVariant>,
      required: true,
    },
  },

  emits: ['close'],

  setup(props, { emit }) {
    const classes = `sad-alert--${props.variant}`;

    const variantIcon = computed(
      () => VARIANTS[props.variant as AlertVariant].icon,
    );

    onMounted(() => {
      if (props.duration === 0) return;
      setTimeout(() => emit('close', props.id), props.duration);
    });

    return { classes, emit, variantIcon };
  },
});
</script>

<style lang="scss" scoped>
.sad-alert {
  background: var(--alert-bg);
  border: 1px solid var(--alert-border);
  border-radius: var(--alert-radius);
  box-shadow: var(--alert-shadow);
  color: var(--text-primary);
  display: flex;
  overflow: hidden;
  width: 350px;

  &__ribbon {
    flex-shrink: 0;
    width: 6px;
  }

  &--error > &__ribbon {
    background: var(--color-error);
  }

  &--success > &__ribbon {
    background: var(--color-success);
  }

  &--warning > &__ribbon {
    background: var(--color-warning);
  }

  &__icon {
    align-self: center;
    color: var(--text-secondary);
    flex-shrink: 0;
    padding-left: 16px;
  }

  &--error > &__icon {
    color: var(--color-error);
  }

  &--success > &__icon {
    color: var(--color-success);
  }

  &--warning > &__icon {
    color: var(--color-warning);
  }

  &__close {
    align-self: center;
    background: none;
    border: 0;
    cursor: pointer;
    margin-right: 16px;
  }

  &__message {
    flex-grow: 1;
    padding: 16px;
  }
}
</style>
