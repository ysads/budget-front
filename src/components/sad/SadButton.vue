<template>
  <button
    class="button"
    :class="[typeClass, sizeClass, fullWidthClass]"
    :size="size"
    :type="type"
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

<script>
const TYPES = ['primary', 'ghost']

export default {
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
      type: String,
      default: 'normal',
      validator (val) {
        return ['normal', 'small'].includes(val)
      },
    },
    type: {
      type: String,
      default: 'primary',
      validator (val) {
        return TYPES.includes(val)
      },
    },
  },

  computed: {
    typeClass () {
      return `button--${this.type}`
    },

    sizeClass () {
      return `button--${this.size}`
    },

    iconClass () {
      return `fa-${this.icon}`
    },

    fullWidthClass () {
      return this.fullWidth ? 'button--full' : ''
    },
  },
}
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
    @include margin(right, 1);
  }

  &:active {
    @include scale-90;
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
