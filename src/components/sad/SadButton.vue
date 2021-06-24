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
  border: none;
  border-radius: $radius-4;
  cursor: pointer;
  font-size: 1rem;

  @extend %barlow;

  @include transition;

  &__icon {
    margin-right: $base * 1;
  }

  &--normal {
    padding: $base * 2 $base * 3;
  }

  &--small {
    padding: $base * 2 $base * 2;
  }

  &--primary {
    background: var(--color-primary);
    color: white;

    &:hover {
      background: var(--color-primary-hover);
    }
  }

  &--ghost {
    background: none;
    color: var(--color-primary);

    &:hover {
      color: var(--color-primary-hover);
    }
  }

  &--full {
    width: 100%;
  }
}
</style>
