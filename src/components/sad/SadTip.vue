<template>
  <p class="tip" :class="variant" data-test="tip">
    {{ text }}
  </p>
</template>

<script>
const variant = ['error', 'info']

export default {
  name: 'SadTip',

  props: {
    text: {
      type: String,
      required: true,
    },
    variant: {
      type: String,
      default: 'info',
      validator (val) {
        return variant.includes(val)
      },
    },
  },
}
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
