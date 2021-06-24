<template>
  <label class="sad-label" :for="to" data-test="label">
    <p class="sad-label__text" data-test="text">{{ text }}</p>
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
  color: var(--text-default);
  display: block;
  font-size: 1rem;

  &__text {
    margin-bottom: $base * 2;
  }
}
</style>
