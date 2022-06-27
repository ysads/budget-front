<template>
  <nav class="settings-header">
    <h1 class="settings-header__title" data-test="account-name">
      <slot />
    </h1>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SettingsHeader',
});
</script>

<style lang="scss" scoped>
.settings-header {
  align-items: center;
  background-color: var(--acc-header-bg);
  color: var(--acc-header-text);
  display: flex;
  flex-flow: column;
  font-size: var(--font-title1);
  justify-content: space-between;
  padding: $base * 4 $base * 6;

  @include breakpoint(md) {
    flex-flow: row;
  }

  @include breakpoint(md) {
    flex-flow: row;
  }

  &__title {
    font-size: var(--font-title1);
    font-weight: 700;
  }
}
</style>
