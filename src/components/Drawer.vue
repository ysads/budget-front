<template>
  <aside class="drawer">
    <ul class="drawer__nav">
      <li class="drawer__nav-item">
        <i class="icon fas fa-piggy-bank"></i>{{ $t('budget') }}
      </li>
      <li class="drawer__nav-item">
        <i class="icon fas fa-chart-area"></i>{{ $t('reports') }}
      </li>
      <li class="drawer__nav-item">
        <i class="icon fas fa-university"></i>{{ $t('allAccounts') }}
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: 'Drawer',
}
</script>

<style lang="scss" scoped>
.drawer {
  padding: $base * 3;

  &__nav {
    display: flex;
    flex-flow: column;

    &-item {
      @extend %menu;

      padding: $base * 2;
      color: white;

      .icon {
        @include margin(right, 4);
      }
    }

    &-item + &-item {
      @include margin(top, 3);
    }
  }
}
</style>
