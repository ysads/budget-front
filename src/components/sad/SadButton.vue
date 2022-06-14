<template>
  <button
    class="button"
    :class="[typeClass, sizeClass, fullWidthClass]"
    :size="size"
    :aria-label="ariaLabel"
    data-test="button"
    @click="$emit('click')"
  >
    <i
      v-if="icon"
      class="button__icon icon fas"
      :class="iconClass"
      data-test="icon"
    />
    <slot />
  </button>
</template>

<script lang="ts">
import { computed } from 'vue';
import { defineComponent, PropType } from 'vue';

type ButtonVariant = 'primary' | 'ghost';
type ButtonSize = 'large' | 'normal' | 'small';

export default defineComponent({
  props: {
    ariaLabel: {
      type: String,
      default: '',
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
    },
    size: {
      type: String as PropType<ButtonSize>,
      default: 'normal',
    },
    type: {
      type: String as PropType<ButtonVariant>,
      default: 'primary',
    },
  },

  emits: ['click'],

  setup(props) {
    const typeClass = computed(() => `button--${props.type}`);
    const sizeClass = computed(() => `button--${props.size}`);
    const iconClass = computed(() => `fa-${props.icon}`);
    const fullWidthClass = computed(() =>
      props.fullWidth ? 'button--full' : '',
    );

    return { typeClass, sizeClass, iconClass, fullWidthClass };
  },
});
</script>

<style lang="scss" scoped>
.button {
  border: 2px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  letter-spacing: 0.5px;
  transition: all 0.2s ease-in-out;

  &__icon {
    margin-right: $base * 2;
  }

  &--large {
    padding: 7px 18px;
  }

  &--normal {
    padding: 5px 16px;
  }

  &--small {
    padding: 3px 12px;
  }

  &--primary {
    background: var(--btn-primary-bg);
    color: var(--btn-primary-text);

    &:hover,
    &:focus {
      background: var(--btn-primary-focus-bg);
    }
  }

  &--ghost {
    background: var(--btn-ghost-bg);
    color: var(--btn-ghost-text);

    &:hover,
    &:focus {
      color: var(--btn-ghost-focus-text);
      background: var(--btn-ghost-focus-bg);
    }
  }

  &--full {
    width: 100%;
  }
}
</style>
