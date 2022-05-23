<template>
  <button
    v-if="clickable"
    class="sad-icon__button"
    :aria-label="ariaLabel"
    data-test="button"
    @click="$emit('click')"
    @keydown.space="$emit('click')"
  >
    <i class="sad-icon icon fas" :class="classes" />
  </button>
  <i v-else class="sad-icon icon fas" :class="classes" />
</template>

<script lang="ts">
import { PropType, computed, defineComponent } from 'vue';

type IconColor =
  | 'disabled'
  | 'green'
  | 'info'
  | 'inherit'
  | 'primary'
  | 'red'
  | 'yellow';
type IconSize = 'small' | 'medium';

export default defineComponent({
  name: 'SadIcon',
  props: {
    ariaLabel: {
      type: String,
      default: '',
    },
    clickable: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String as PropType<IconColor>,
      default: 'inherit',
    },
    name: {
      type: String,
      required: true,
    },
    size: {
      type: String as PropType<IconSize>,
      default: 'small',
    },
  },

  emits: ['click'],

  setup(props) {
    const classes = computed(() => [
      `fa-${props.name}`,
      `sad-icon--${props.color}`,
      `sad-icon--${props.size}`,
    ]);

    return { classes };
  },
});
</script>

<style lang="scss" scoped>
.sad-icon {
  &__button {
    background: none;
    cursor: pointer;
    outline: none;
  }

  &--small {
    font-size: 16px;
  }

  &--medium {
    font-size: 24px;
  }

  &--green {
    color: var(--color-success);
  }

  &--info {
    color: var(--color-info);
  }

  &--disabled {
    color: var(--color-disabled);
  }

  &--inherit {
    color: inherit;
  }

  &--primary {
    color: var(--color-primary);
  }

  &--red {
    color: var(--color-error);
  }

  &--yellow {
    color: var(--color-warning);
  }
}
</style>
