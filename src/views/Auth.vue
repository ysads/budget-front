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
    margin: 0 auto;
    width: 100%;

    @include breakpoint(md) {
      width: 400px;
    }
  }
}
</style>
