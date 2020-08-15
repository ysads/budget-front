<template>
  <div class="auth">
    <main class="auth__main">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Auth',

  components: {
  },
}
</script>

<style lang="scss" scoped>
.auth {
  &__main {
    width: 100%;
    margin: 0 auto;

    @include breakpoint(md) {
      width: 400px;
    }
  }
}
</style>
