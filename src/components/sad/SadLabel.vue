<template>
  <label class="sad-label" :for="to" data-test="label">
    <span class="sad-label__text" data-test="text">{{ text }}</span>
    <slot />
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    text: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
  },
  name: 'SadLabel',
});
</script>

<style lang="scss" scoped>
.sad-label {
  color: var(--text-primary);
  display: block;
  font-size: 1rem;

  &__text {
    display: inline-block;
    margin-bottom: $base;
  }
}
</style>
