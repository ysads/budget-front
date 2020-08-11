<template>
  <div class="dashboard">
    <drawer class="dashboard__drawer" />
    <main class="dashboard__main">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Drawer from '@/components/Drawer'

export default {
  name: 'Dashboard',

  components: {
    Drawer,
  },
}
</script>

<style lang="scss" scoped>
.dashboard {
  display: flex;
  flex-flow: row;
  height: 100vh;

  &__drawer {
    display: none;

    @include breakpoint(md) {
      display: block;
      height: 100%;
      width: 20%;
      background: teal;
    }
  }

  &__main {
    width: 100%;

    @include breakpoint(md) {
      width: 80%;
    }
  }
}
</style>
