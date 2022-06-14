<template>
  <i class="sad-icon icon fas" :class="classes" />
</template>

<script lang="ts">
import { PropType, computed, defineComponent } from 'vue';

type IconSize = 'tiny' | 'small' | 'medium';

export default defineComponent({
  name: 'SadIcon',
  props: {
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
    color: inherit;
    cursor: pointer;
    outline: none;
  }

  &--tiny {
    font-size: 12px;
  }

  &--small {
    font-size: 16px;
  }

  &--medium {
    font-size: 24px;
  }
}
</style>
