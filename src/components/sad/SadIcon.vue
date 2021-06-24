<template>
  <button
    v-if="clickable"
    class="sad-icon__button"
    data-test="button"
    @click="$emit('click')"
  >
    <i class="sad-icon icon fas" :class="classes" />
  </button>
  <i v-else class="sad-icon icon fas" :class="classes" />
</template>

<script lang="ts">
import { PropType, computed, defineComponent } from 'vue';

type IconColor = 'green' | 'info' | 'inherit' | 'primary' | 'red' | 'yellow';
type IconSize = 'small' | 'medium';

export default defineComponent({
  name: 'SadIcon',
  props: {
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

    &:active {
      // @include scale-90;
    }
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
