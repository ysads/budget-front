<template>
  <div class="sad-drawer">
    <div
      class="sad-drawer__overlay"
      data-test="overlay"
      @click="$emit('close')"
    />
    <section class="sad-drawer__wrapper">
      <header class="sad-drawer__header">
        <sad-icon
          name="times"
          color="primary"
          size="medium"
          clickable
          data-test="close-btn"
          @click="$emit('close')"
        />
        <h3 v-if="title" class="sad-drawer__header-title" data-test="title">
          {{ title }}
        </h3>
      </header>
      <div class="sad-drawer__content">
        <slot />
      </div>
      <footer class="sad-drawer__footer">
        <slot name="footer" />
      </footer>
    </section>
  </div>
</template>

<script lang="ts">
import SadIcon from './SadIcon.vue';

export default {
  name: 'SadDrawer',
  components: {
    SadIcon,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  emits: ['close'],
};
</script>

<style lang="scss">
.sad-drawer {
  $padding: $base * 6;

  &__overlay {
    background: var(--modal-overlay);
    bottom: 0;
    cursor: pointer;
    height: 100%;
    left: 0;
    overflow: hidden;
    position: fixed;
    right: 0;
    top: 0;
    width: 100%;
    z-index: 3;
  }

  &__wrapper {
    background: var(--drawer-bg);
    box-sizing: border-box;
    display: flex;
    flex-flow: column;
    height: 100vh;
    overflow: auto;
    padding: $padding;
    position: fixed;
    right: 0;
    top: 0;
    transition: all 0.5s ease;
    width: 100%;
    z-index: 4;

    @include breakpoint(md) {
      width: 400px;
    }
  }

  &__header {
    align-items: center;
    display: flex;
    flex-direction: row-reverse;
    font-size: 1.75rem;
    justify-content: space-between;

    margin-bottom: $base * 6;
    margin-bottom: $base * 6;

    &-title {
      color: var(--modal-title);

      @extend %h3;
    }

    i {
      color: var(--modal-close-btn);
      cursor: pointer;

      &:active {
        // @include scale-90;
      }
    }
  }

  &__content {
    flex-grow: 1;
  }

  &__footer {
    width: 100%;

    margin-top: $base * 4;
  }

  &__group {
    display: flex;
    justify-content: space-between;
  }
}
</style>
