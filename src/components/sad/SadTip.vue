<template>
  <p class="tip" :class="variant" data-test="tip">
    {{ text }}
  </p>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

type TipVariant = 'error' | 'info';

export default defineComponent({
  name: 'SadTip',

  props: {
    text: {
      type: String,
      required: true,
    },
    variant: {
      type: String as PropType<TipVariant>,
      default: 'info',
    },
  },
});
</script>

<style lang="scss" scoped>
.tip {
  @extend %caption-2;

  &.info {
    color: var(--color-info);
  }

  &.error {
    color: var(--color-error);
  }
}
</style>
