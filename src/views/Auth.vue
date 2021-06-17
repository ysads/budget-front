<template>
  <div class="auth">
    <main class="auth__main">
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Auth',
});
</script>

<style lang="scss" scoped>
.auth {
  &__main {
    margin: 0 auto;
    width: 100%;
    @include breakpoint(md) {
      width: 400px;
    }
  }
}
</style>
