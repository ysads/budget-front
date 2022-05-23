<template>
  <button
    class="button"
    :class="[typeClass, sizeClass, fullWidthClass]"
    :size="size"
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
type ButtonSize = 'normal' | 'small';

export default defineComponent({
  props: {
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
  font-size: 1rem;

  @extend %barlow;

  @include transition;

  &__icon {
    margin-right: $base * 1;
  }

  &--normal {
    padding: 5px 16px;
  }

  &--small {
    padding: 3px 12px;
  }

  &--primary {
    background: var(--color-primary);
    color: white;

    &:hover,
    &:focus {
      background: var(--color-primary-hover);
    }
  }

  &--ghost {
    background: none;
    color: var(--color-primary);

    &:hover,
    &:focus {
      color: var(--color-primary-hover);
      background: var(--color-primary-hover-bg);
    }
  }

  &--full {
    width: 100%;
  }
}
</style>
